import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FlowEntity } from '../app/flows/flow.entity';

export interface WebhookEvent {
  id: string;
  flowId: string;
  eventName: string;
  payload: any;
  headers: Record<string, string>;
  timestamp: Date;
  processed: boolean;
}

@Entity('webhooks')
export class WebhookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  endpoint: string;

  @Column()
  flowId: number;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, any>;

  @Column({ default: 0 })
  callCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastCalled: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => FlowEntity, flow => flow.id)
  @JoinColumn({ name: 'flowId' })
  flow: FlowEntity;
}

@Entity('webhook_events')
export class WebhookEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  webhookId: number;

  @Column()
  eventName: string;

  @Column({ type: 'jsonb' })
  payload: any;

  @Column({ type: 'jsonb' })
  headers: Record<string, string>;

  @Column({ default: false })
  processed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date;

  @Column({ type: 'text', nullable: true })
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}
