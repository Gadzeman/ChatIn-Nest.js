import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatDto } from "../dto/chat.dto";

@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket): void {}

  handleDisconnect(client: Socket): void {}

  @SubscribeMessage("joinChatRoom")
  handleJoinChatRoom(client: Socket, data: ChatDto): void {
    client.join(data.roomId);
  }
}
