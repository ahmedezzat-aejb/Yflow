// Mock WebSocket Gateway for development without WebSocket dependencies
export class MockFlowGateway {
  // Mock implementation for development
  emitFlowStarted(flowId: string, projectId: string, data: any) {
    console.log(`🚀 Flow Started: ${flowId}`, data);
  }

  emitFlowCompleted(flowId: string, projectId: string, data: any) {
    console.log(`✅ Flow Completed: ${flowId}`, data);
  }

  emitFlowFailed(flowId: string, projectId: string, data: any) {
    console.log(`❌ Flow Failed: ${flowId}`, data);
  }

  emitStepStarted(flowId: string, projectId: string, data: any) {
    console.log(`🔄 Step Started: ${data.stepId}`, data);
  }

  emitStepCompleted(flowId: string, projectId: string, data: any) {
    console.log(`✅ Step Completed: ${data.stepId}`, data);
  }

  emitStepFailed(flowId: string, projectId: string, data: any) {
    console.log(`❌ Step Failed: ${data.stepId}`, data);
  }

  emitFlowProgress(flowId: string, projectId: string, data: any) {
    console.log(`📊 Flow Progress: ${flowId}`, data);
  }
}
