import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookEntity, WebhookEventEntity } from './webhook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebhookEntity, WebhookEventEntity])],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
