import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookEntity, WebhookEventEntity } from './webhook.entity';
import { FlowExecutionGateway } from '../websocket/websocket.gateway';

export interface CreateWebhookDto {
  name: string;
  endpoint: string;
  flowId: number;
  config?: Record<string, any>;
  status?: 'active' | 'inactive';
}

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(WebhookEntity)
    private webhooksRepository: Repository<WebhookEntity>,
    @InjectRepository(WebhookEventEntity)
    private webhookEventsRepository: Repository<WebhookEventEntity>,
    private websocketGateway: FlowExecutionGateway,
  ) {}

  async create(createWebhookDto: CreateWebhookDto): Promise<WebhookEntity> {
    const webhook = this.webhooksRepository.create(createWebhookDto);
    return await this.webhooksRepository.save(webhook);
  }

  async findAll(): Promise<WebhookEntity[]> {
    return await this.webhooksRepository.find({
      relations: ['flow'],
    });
  }

  async findOne(id: number): Promise<WebhookEntity> {
    const webhook = await this.webhooksRepository.findOne({
      where: { id },
      relations: ['flow'],
    });

    if (!webhook) {
      throw new NotFoundException(`Webhook with ID ${id} not found`);
    }

    return webhook;
  }

  async update(id: number, updateData: Partial<CreateWebhookDto>): Promise<WebhookEntity> {
    await this.webhooksRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const webhook = await this.findOne(id);
    await this.webhooksRepository.remove(webhook);
  }

  async processWebhook(endpoint: string, payload: any, headers: Record<string, string>): Promise<any> {
    // Find webhook by endpoint
    const webhook = await this.webhooksRepository.findOne({
      where: { endpoint, status: 'active' },
      relations: ['flow'],
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found or inactive');
    }

    // Create webhook event
    const webhookEvent = this.webhookEventsRepository.create({
      webhookId: webhook.id,
      eventName: 'webhook_received',
      payload,
      headers,
    });

    await this.webhookEventsRepository.save(webhookEvent);

    try {
      // Update call count and last called
      await this.webhooksRepository.update(webhook.id, {
        callCount: webhook.callCount + 1,
        lastCalled: new Date(),
      });

      // Trigger flow execution
      if (webhook.flow) {
        await this.triggerFlow(webhook.flow, payload);
      }

      // Mark event as processed
      await this.webhookEventsRepository.update(webhookEvent.id, {
        processed: true,
        processedAt: new Date(),
      });

      return {
        success: true,
        eventId: webhookEvent.id,
        message: 'Webhook processed successfully',
      };
    } catch (error) {
      // Mark event as failed
      await this.webhookEventsRepository.update(webhookEvent.id, {
        error: error.message,
      });

      throw new BadRequestException(`Failed to process webhook: ${error.message}`);
    }
  }

  private async triggerFlow(flow: any, payload: any): Promise<void> {
    // Emit flow execution event via WebSocket
    this.websocketGateway.emitFlowStarted(flow.id.toString(), flow.projectId?.toString() || '', {
      flowId: flow.id,
      flowName: flow.name,
      trigger: 'webhook',
      payload,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically queue the flow for execution
    // For now, we'll just emit the event
    console.log(`🎯 Webhook triggered flow: ${flow.name} with payload:`, payload);
  }

  async getWebhookEvents(webhookId: number): Promise<WebhookEventEntity[]> {
    return await this.webhookEventsRepository.find({
      where: { webhookId },
      order: { createdAt: 'DESC' },
    });
  }

  async getWebhookStats(id: number): Promise<any> {
    const webhook = await this.findOne(id);
    const events = await this.getWebhookEvents(id);

    const successfulEvents = events.filter(e => e.processed && !e.error);
    const failedEvents = events.filter(e => e.error);

    return {
      webhook: {
        id: webhook.id,
        name: webhook.name,
        endpoint: webhook.endpoint,
        status: webhook.status,
        callCount: webhook.callCount,
        lastCalled: webhook.lastCalled,
      },
      stats: {
        totalEvents: events.length,
        successfulEvents: successfulEvents.length,
        failedEvents: failedEvents.length,
        successRate: events.length > 0 ? (successfulEvents.length / events.length) * 100 : 0,
      },
      recentEvents: events.slice(0, 10),
    };
  }
}
