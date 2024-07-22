import { Server } from 'socket.io';
export declare class WebSocketGateway {
    server: Server;
    handleMessage(client: any, payload: any): void;
}
