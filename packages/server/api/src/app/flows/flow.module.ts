import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { FlowEntity } from './flow.entity';
import { ProjectEntity } from '../projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlowEntity, ProjectEntity])],
  controllers: [FlowController],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {}
