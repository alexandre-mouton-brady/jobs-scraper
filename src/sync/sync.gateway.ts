import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SyncGateway {
  @WebSocketServer()
  server;

  emit(event, ...data) {
    this.server.emit(event, ...data);
  }
}
