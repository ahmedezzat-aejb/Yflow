import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { FlowExecutionGateway } from '../websocket/websocket.gateway';
import { FlowService } from '../app/flows/flow.service';

export interface FlowJob {
  flowId: number;
  projectId: number;
  triggerData?: any;
  userId?: string;
}

export interface FlowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action';
  pieceId: string;
  config: any;
  position?: { x: number; y: number };
}

@Processor('flow-execution')
export class FlowWorker {
  private readonly logger = new Logger(FlowWorker.name);

  constructor(
    private readonly flowService: FlowService,
    private readonly websocketGateway: FlowExecutionGateway,
  ) {}

  @Process('execute-flow')
  async executeFlow(job: Job<FlowJob>) {
    const { flowId, projectId, triggerData, userId } = job.data;

    this.logger.log(`🚀 Starting flow execution: ${flowId} for project: ${projectId}`);

    try {
      // Get flow details
      const flow = await this.flowService.findOne(flowId);
      if (!flow) {
        throw new Error(`Flow not found: ${flowId}`);
      }

      // Emit flow started event
      this.websocketGateway.emitFlowStarted(flowId.toString(), projectId.toString(), {
        flowId,
        projectId,
        userId,
        startedAt: new Date(),
      });

      // Execute flow steps
      const steps = flow.steps || [];
      const executionResults = [];

      for (const step of steps) {
        try {
          this.logger.log(`🔄 Executing step: ${step.name}`);

          // Emit step started
          this.websocketGateway.emitStepStarted(flowId.toString(), projectId.toString(), {
            stepId: step.id,
            stepName: step.name,
            startedAt: new Date(),
          });

          // Execute step logic
          const result = await this.executeStep(step, triggerData, executionResults);

          executionResults.push({
            stepId: step.id,
            stepName: step.name,
            result,
            executedAt: new Date(),
          });

          // Emit step completed
          this.websocketGateway.emitStepCompleted(flowId.toString(), projectId.toString(), {
            stepId: step.id,
            stepName: step.name,
            result,
            completedAt: new Date(),
          });

          this.logger.log(`✅ Step completed: ${step.name}`);

        } catch (stepError) {
          this.logger.error(`❌ Step failed: ${step.name}`, stepError);

          // Emit step failed
          this.websocketGateway.emitStepFailed(flowId.toString(), projectId.toString(), {
            stepId: step.id,
            stepName: step.name,
            error: stepError.message,
            failedAt: new Date(),
          });

          // Continue execution even if step fails
          executionResults.push({
            stepId: step.id,
            stepName: step.name,
            error: stepError.message,
            failedAt: new Date(),
          });
        }
      }

      // Emit flow completed
      this.websocketGateway.emitFlowCompleted(flowId.toString(), projectId.toString(), {
        flowId,
        projectId,
        userId,
        results: executionResults,
        completedAt: new Date(),
      });

      this.logger.log(`✅ Flow execution completed: ${flowId}`);

      return {
        success: true,
        flowId,
        projectId,
        results: executionResults,
        executedAt: new Date(),
      };

    } catch (error) {
      this.logger.error(`❌ Flow execution failed: ${flowId}`, error);

      // Emit flow failed
      this.websocketGateway.emitFlowFailed(flowId.toString(), projectId.toString(), {
        flowId,
        projectId,
        userId,
        error: error.message,
        failedAt: new Date(),
      });

      throw error;
    }
  }

  @Process('test-flow')
  async testFlow(job: Job<{ flowId: number; testData: any }>) {
    const { flowId, testData } = job.data;

    this.logger.log(`🧪 Testing flow: ${flowId}`);

    try {
      const flow = await this.flowService.findOne(flowId);
      if (!flow) {
        throw new Error(`Flow not found: ${flowId}`);
      }

      // Execute only the first step for testing
      const steps = flow.steps || [];
      if (steps.length === 0) {
        throw new Error('No steps found in flow');
      }

      const firstStep = steps[0];
      const result = await this.executeStep(firstStep, testData, []);

      this.logger.log(`✅ Flow test completed: ${flowId}`);

      return {
        success: true,
        flowId,
        stepResult: result,
        testedAt: new Date(),
      };

    } catch (error) {
      this.logger.error(`❌ Flow test failed: ${flowId}`, error);
      throw error;
    }
  }

  private async executeStep(step: FlowStep, triggerData: any, previousResults: any[]): Promise<any> {
    // Mock step execution logic
    switch (step.type) {
      case 'trigger':
        return this.executeTrigger(step, triggerData);
      case 'action':
        return this.executeAction(step, triggerData, previousResults);
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  private async executeTrigger(step: FlowStep, triggerData: any): Promise<any> {
    // Mock trigger execution
    this.logger.log(`🎯 Executing trigger: ${step.pieceId}`);

    return {
      trigger: step.pieceId,
      data: triggerData || {},
      executedAt: new Date(),
    };
  }

  private async executeAction(step: FlowStep, triggerData: any, previousResults: any[]): Promise<any> {
    // Mock action execution
    this.logger.log(`⚡ Executing action: ${step.pieceId}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      action: step.pieceId,
      config: step.config,
      input: triggerData || {},
      previousResults,
      output: {
        success: true,
        data: `Mock result for ${step.pieceId}`,
        timestamp: new Date(),
      },
      executedAt: new Date(),
    };
  }

  @Process('cleanup-flow-data')
  async cleanupFlowData(job: Job<{ flowId: number; olderThanDays: number }>) {
    const { flowId, olderThanDays } = job.data;

    this.logger.log(`🧹 Cleaning up flow data: ${flowId} older than ${olderThanDays} days`);

    // Mock cleanup logic
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    // In real implementation, this would clean up old execution logs, temporary data, etc.

    return {
      success: true,
      flowId,
      cutoffDate,
      cleanedAt: new Date(),
    };
  }
}
