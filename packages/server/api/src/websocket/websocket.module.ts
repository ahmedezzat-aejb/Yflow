import { Module } from '@nestjs/common';
import { FlowExecutionGateway } from './websocket.gateway';

@Module({
  providers: [FlowExecutionGateway],
  exports: [FlowExecutionGateway],
})
export class WebsocketModule {}
