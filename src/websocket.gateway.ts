import { SubscribeMessage, WebSocketGateway as WebSocketGatewayInj, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGatewayInj()
export class WebSocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload); // Broadcast message to all connected clients
  }
}