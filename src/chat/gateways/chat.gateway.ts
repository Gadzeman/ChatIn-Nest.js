import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket): void {
    console.log("connected", client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log("disconnected", client.id);
  }

  @SubscribeMessage("chat-created")
  handleChatCreated(): void {
    console.log("chat created successfully");
  }
}
