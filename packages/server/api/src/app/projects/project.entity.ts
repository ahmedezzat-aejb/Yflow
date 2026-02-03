import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { FlowEntity } from '../flows/flow.entity';

export interface ProjectPlan {
  type: 'free' | 'golden';
  expiresAt: Date | null;
  subscriptionId: string | null;
}

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    displayName: string;

    @Column({
      type: 'jsonb',
      nullable: true,
      default: { type: "free", expiresAt: null, subscriptionId: null }
    })
    plan: ProjectPlan;

    @OneToMany(() => FlowEntity, flow => flow.project)
    flows: FlowEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
