import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlowEntity, FlowStep } from './flow.entity';
import { ProjectEntity } from '../projects/project.entity';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(FlowEntity)
    private flowRepository: Repository<FlowEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>
  ) {}

  async create(data: Partial<FlowEntity>) {
    const flow = this.flowRepository.create(data);
    return this.flowRepository.save(flow);
  }

  async findAll(projectId?: number) {
    const queryBuilder = this.flowRepository
      .createQueryBuilder('flow')
      .leftJoinAndSelect('flow.project', 'project');

    if (projectId) {
      queryBuilder.where('project.id = :projectId', { projectId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    return this.flowRepository.findOne({
      where: { id },
      relations: ['project']
    });
  }

  async update(id: number, data: Partial<FlowEntity>) {
    await this.flowRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.flowRepository.delete(id);
  }

  async findByProject(projectId: number) {
    return this.flowRepository.find({
      where: { project: { id: projectId } },
      relations: ['project']
    });
  }

  async updateStatus(id: number, status: 'active' | 'inactive' | 'draft') {
    await this.flowRepository.update(id, { status });
    return this.findOne(id);
  }

  async executeFlow(flowId: number) {
    try {
      // 1. هنجيب بيانات الفلو من الداتابيز (SQLite)
      const flow = await this.findOne(flowId);

      if (!flow) {
        throw new Error(`Flow with ID ${flowId} not found`);
      }

      // 2. Get steps from the flow entity
      const steps: FlowStep[] = flow.steps || [];

      // 3. مؤقتاً - هطبع الـ Steps لغاية ما نضيف الـ Engine
      console.log(`🚀 Flow ${flow.name} ready for execution`);
      console.log(`📋 Steps:`, steps);

      // TODO: هنرمي الشغلة للـ Engine (عبر Redis) لما نضيف BullMQ

      return {
        success: true,
        message: 'Flow execution simulated successfully',
        flowName: flow.name,
        steps: steps
      };
    } catch (error) {
      console.error('❌ Error executing flow:', error);
      throw new Error(`Failed to execute flow: ${error.message}`);
    }
  }
}
