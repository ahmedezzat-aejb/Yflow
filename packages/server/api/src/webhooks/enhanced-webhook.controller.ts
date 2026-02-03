import { Controller, Get, Post, Body, Param, Delete, Put, Req, Res, HttpStatus, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService, CreateWebhookDto } from './webhook.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhookService.create(createWebhookDto);
  }

  @Get()
  findAll() {
    return this.webhookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhookService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateWebhookDto>) {
    return this.webhookService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(+id);
  }

  @Get(':id/events')
  getEvents(@Param('id') id: string) {
    return this.webhookService.getWebhookEvents(+id);
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    return this.webhookService.getWebhookStats(+id);
  }

  // Public webhook endpoint
  @Post('receive/:endpoint')
  async receiveWebhook(
    @Param('endpoint') endpoint: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const payload = req.body;
      const headers = req.headers as Record<string, string>;

      const result = await this.webhookService.processWebhook(endpoint, payload, headers);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Test webhook endpoint
  @Post(':id/test')
  @UseGuards(JwtAuthGuard)
  async testWebhook(@Param('id') id: string, @Body() testPayload: any) {
    try {
      const webhook = await this.webhookService.findOne(+id);

      // Simulate webhook processing
      const result = {
        success: true,
        webhookId: webhook.id,
        endpoint: webhook.endpoint,
        payload: testPayload,
        processedAt: new Date().toISOString(),
        message: 'Webhook test successful',
      };

      return result;
    } catch (error) {
      throw new BadRequestException(`Failed to test webhook: ${error.message}`);
    }
  }

  // Enable/disable webhook
  @Post(':id/toggle')
  @UseGuards(JwtAuthGuard)
  async toggleWebhook(@Param('id') id: string) {
    try {
      const webhook = await this.webhookService.findOne(+id);
      const newStatus = webhook.status === 'active' ? 'inactive' : 'active';

      await this.webhookService.update(+id, { status: newStatus });

      return {
        success: true,
        webhookId: webhook.id,
        oldStatus: webhook.status,
        newStatus,
        message: `Webhook ${newStatus === 'active' ? 'enabled' : 'disabled'} successfully`,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to toggle webhook: ${error.message}`);
    }
  }

  // Get webhook logs
  @Get(':id/logs')
  @UseGuards(JwtAuthGuard)
  async getWebhookLogs(@Param('id') id: string, @Query() query: any) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 50;

      const events = await this.webhookService.getWebhookEvents(+id);

      // Paginate results
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEvents = events.slice(startIndex, endIndex);

      return {
        success: true,
        logs: paginatedEvents,
        pagination: {
          page,
          limit,
          total: events.length,
          totalPages: Math.ceil(events.length / limit),
        },
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get webhook logs: ${error.message}`);
    }
  }

  // Bulk operations
  @Post('bulk-create')
  @UseGuards(JwtAuthGuard)
  async bulkCreateWebhooks(@Body() webhooks: CreateWebhookDto[]) {
    try {
      const results = [];

      for (const webhookData of webhooks) {
        const result = await this.webhookService.create(webhookData);
        results.push(result);
      }

      return {
        success: true,
        created: results.length,
        webhooks: results,
      };
    } catch (error) {
      throw new BadRequestException(`Bulk create failed: ${error.message}`);
    }
  }

  @Delete('bulk-delete')
  @UseGuards(JwtAuthGuard)
  async bulkDeleteWebhooks(@Body() ids: number[]) {
    try {
      const results = [];

      for (const id of ids) {
        await this.webhookService.remove(id);
        results.push({ id, deleted: true });
      }

      return {
        success: true,
        deleted: results.length,
        results,
      };
    } catch (error) {
      throw new BadRequestException(`Bulk delete failed: ${error.message}`);
    }
  }
}
