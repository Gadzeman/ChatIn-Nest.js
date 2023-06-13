import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    return null;
    // Handle new client connection
  }

  handleDisconnect(client: Socket) {
    return null;
    // Handle client disconnection
  }

  handleChatCreation(data: any) {
    return null;
    // Handle chat creation event from client
  }
}
