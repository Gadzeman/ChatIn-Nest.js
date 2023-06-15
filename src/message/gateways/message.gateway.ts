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

@WebSocketGateway(3001)
export class MessageGateway
  implements OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  private server: Server;

  handleDisconnect(ws: WebSocket): void {}

  handleConnection(ws: WebSocket): void {}

  @SubscribeMessage("message-created")
  async handleMessageEvent(client: Socket, data: MessageDto): Promise<void> {
    const userIds = await this.chatService.getChatUserIds(data.chatId);
    userIds.forEach((userId) => {
      this.server.to(userId.toString()).emit("message-created", data);
    });
  }
}
