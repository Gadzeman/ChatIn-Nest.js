import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageDto } from "../dto/message.dto";
import { ChatService } from "../../chat/services/chat.service";
import { ChatDto } from "../../chat/dto/chat.dto";

@WebSocketGateway(3001)
export class MessageGateway
  implements OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  private server: Server;

  handleDisconnect(ws: WebSocket): void {}

  handleConnection(ws: WebSocket): void {}

  @SubscribeMessage("messageCreated")
  async handleMessageEvent(
    client: Socket,
    { message, chat }: { message: MessageDto; chat: ChatDto }
  ): Promise<void> {
    this.server.to(chat.roomId).emit("messageCreated", message);
  }
}
