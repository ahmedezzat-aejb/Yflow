import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowEntity } from './flow.entity';

@Controller('flows')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  create(@Body() createFlowDto: Partial<FlowEntity>) {
    return this.flowService.create(createFlowDto);
  }

  @Get()
  findAll(@Query('projectId') projectId?: number) {
    return this.flowService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowDto: Partial<FlowEntity>) {
    return this.flowService.update(+id, updateFlowDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'active' | 'inactive' | 'draft'
  ) {
    return this.flowService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowService.remove(+id);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.flowService.findByProject(+projectId);
  }

  @Post(':id/execute')
  async executeFlow(@Param('id') id: string) {
    return this.flowService.executeFlow(+id);
  }
}
