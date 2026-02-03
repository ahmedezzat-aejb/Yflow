import { Logger } from '@nestjs/common';
import { FlowExecutionGateway } from '../websocket/websocket.gateway';
import { FlowService } from '../app/flows/flow.service';
import { FlowStep as EntityFlowStep } from '../app/flows/flow.entity';

export interface FlowJob {
  flowId: string;
  projectId: string;
  triggerData?: any;
  userId?: string;
}

export interface FlowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action';
  pieceName: string;
  actionName?: string;
  config: any;
  position?: { x: number; y: number };
}

export class FlowWorker {
  private readonly logger = new Logger(FlowWorker.name);

  constructor(
    private readonly flowService: FlowService,
    private readonly websocketGateway: FlowExecutionGateway,
  ) {}

  async executeFlow(job: FlowJob) {
    const { flowId, projectId, triggerData, userId } = job;

    this.logger.log(`🚀 Starting flow execution: ${flowId} for project: ${projectId}`);

    try {
      // Get flow details
      const flow = await this.flowService.findOne(parseInt(flowId));
      if (!flow) {
        throw new Error(`Flow not found: ${flowId}`);
      }

      // Emit flow started event
      this.websocketGateway.emitFlowStarted(flowId, projectId, {
        flowId,
        projectId,
        userId,
        startedAt: new Date(),
      });

      // Mock flow execution
      const steps = flow.steps || [];
      const executionResults = [];

      for (const step of steps) {
        try {
          this.logger.log(`🔄 Executing step: ${step.name}`);

          // Emit step started
          this.websocketGateway.emitStepStarted(flowId, projectId, {
            stepId: step.id,
            stepName: step.name,
            startedAt: new Date(),
          });

          // Convert entity step to worker step
          const workerStep: FlowStep = {
            id: step.id,
            name: step.name,
            type: step.type,
            pieceName: step.pieceId, // Use pieceId from entity
            actionName: step.config?.actionName,
            config: step.config,
            position: step.position,
          };

          const result = await this.executeStep(workerStep, triggerData, executionResults);

          executionResults.push({
            stepId: step.id,
            stepName: step.name,
            result,
            executedAt: new Date(),
          });

          // Emit step completed
          this.websocketGateway.emitStepCompleted(flowId, projectId, {
            stepId: step.id,
            stepName: step.name,
            result,
            completedAt: new Date(),
          });

          this.logger.log(`✅ Step completed: ${step.name}`);

        } catch (stepError) {
          this.logger.error(`❌ Step failed: ${step.name}`, stepError);

          // Emit step failed
          this.websocketGateway.emitStepFailed(flowId, projectId, {
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
      this.websocketGateway.emitFlowCompleted(flowId, projectId, {
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
      this.websocketGateway.emitFlowFailed(flowId, projectId, {
        flowId,
        projectId,
        userId,
        error: error.message,
        failedAt: new Date(),
      });

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
    this.logger.log(`🎯 Executing trigger: ${step.pieceName}.${step.actionName}`);

    return {
      trigger: step.pieceName,
      action: step.actionName,
      data: triggerData || {},
      executedAt: new Date(),
    };
  }

  private async executeAction(step: FlowStep, triggerData: any, previousResults: any[]): Promise<any> {
    // Mock action execution
    this.logger.log(`⚡ Executing action: ${step.pieceName}.${step.actionName}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      action: step.pieceName,
      actionName: step.actionName,
      config: step.config,
      input: triggerData || {},
      previousResults,
      output: {
        success: true,
        data: `Mock result for ${step.pieceName}.${step.actionName}`,
        timestamp: new Date(),
      },
      executedAt: new Date(),
    };
  }
}
