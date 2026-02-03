import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectEntity } from '../projects/project.entity';
import { UserEntity } from '../../auth/auth.entity';

export type FlowStatus = 'active' | 'inactive' | 'draft';

export interface FlowStep {
  id: string;
  type: 'trigger' | 'action';
  pieceId: string;
  name: string;
  config: any;
  position: { x: number; y: number };
}

@Entity('flow')
export class FlowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    default: 'draft'
  })
  status: FlowStatus;

  @Column({ type: 'jsonb', nullable: true })
  configuration: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  steps: FlowStep[];

  @Column({ type: 'int', nullable: true })
  projectId: number;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @ManyToOne(() => ProjectEntity, project => project.flows, { nullable: true })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user.flows, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
