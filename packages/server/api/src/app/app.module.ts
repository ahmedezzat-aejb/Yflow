import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './projects/project.module';
import { ProjectEntity } from './projects/project.entity';
import { FlowModule } from './flows/flow.module';
import { FlowEntity } from './flows/flow.entity';
import { ExploreModule } from './explore/explore.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../auth/auth.entity';
import { WebhookModule } from '../webhooks/webhook.module';
import { WebhookEntity, WebhookEventEntity } from '../webhooks/webhook.entity';

// Database configuration with fallback
const dbConfig = process.env.DB_TYPE === 'postgres' ? {
  type: 'postgres' as const,
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'yflow',
} : {
  type: 'sqlite' as const,
  database: 'data/yflow.db',
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [ProjectEntity, FlowEntity, UserEntity, WebhookEntity, WebhookEventEntity],
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
      extra: dbConfig.type === 'postgres' ? {
        poolSize: 10,
      } : undefined,
    }),
    ProjectModule,
    FlowModule,
    ExploreModule,
    WebsocketModule,
    AuthModule,
    WebhookModule,
  ],
})
export class AppModule {}
