import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FlowExecutionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-flow')
  handleJoinFlow(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { flowId: string; projectId: string },
  ) {
    client.join(`flow-${data.flowId}`);
    client.join(`project-${data.projectId}`);
    
    client.emit('joined-flow', {
      flowId: data.flowId,
      message: 'Joined flow room',
    });
  }

  @SubscribeMessage('leave-flow')
  handleLeaveFlow(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { flowId: string },
  ) {
    client.leave(`flow-${data.flowId}`);
    
    client.emit('left-flow', {
      flowId: data.flowId,
      message: 'Left flow room',
    });
  }

  // Flow execution events
  emitFlowStarted(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('flow-started', data);
    this.server.to(`project-${projectId}`).emit('flow-started', data);
  }

  emitFlowCompleted(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('flow-completed', data);
    this.server.to(`project-${projectId}`).emit('flow-completed', data);
  }

  emitFlowFailed(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('flow-failed', data);
    this.server.to(`project-${projectId}`).emit('flow-failed', data);
  }

  emitStepStarted(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('step-started', data);
    this.server.to(`project-${projectId}`).emit('step-started', data);
  }

  emitStepCompleted(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('step-completed', data);
    this.server.to(`project-${projectId}`).emit('step-completed', data);
  }

  emitStepFailed(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('step-failed', data);
    this.server.to(`project-${projectId}`).emit('step-failed', data);
  }

  emitFlowProgress(flowId: string, projectId: string, data: any) {
    this.server.to(`flow-${flowId}`).emit('flow-progress', data);
    this.server.to(`project-${projectId}`).emit('flow-progress', data);
  }
}
