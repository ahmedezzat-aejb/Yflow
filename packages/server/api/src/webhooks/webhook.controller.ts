import { Controller, Get, Post, Body, Param, Delete, Put, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService, CreateWebhookDto } from './webhook.service';

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
}
