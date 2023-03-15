import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Subject } from "rxjs";
import { MessageEntity } from "../entities/message.entity";

interface MessageEvent {
  event: "message-event";
  data: MessageEntity;
}

@WebSocketGateway(3001)
export class MessageGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private websockets = new Map<WebSocket, Subject<MessageEvent>>();

  handleDisconnect(ws: WebSocket): void {
    console.log("user disconnected");
    this.websockets.get(ws).complete();
    this.websockets.get(ws).unsubscribe();
    this.websockets.delete(ws);
  }

  handleConnection(ws: WebSocket): void {
    console.log("user connected");
    this.websockets.set(ws, new Subject<MessageEvent>());
  }
}
