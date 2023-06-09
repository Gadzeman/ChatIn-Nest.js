import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Observable, Subject } from "rxjs";
import { MessageEntity } from "../entities/message.entity";
import { MessageService } from "../services/message.service";

enum EventNames {
  MessageEventName = "message-event",
}

interface MessageEvent {
  event: EventNames.MessageEventName;
  data: MessageEntity;
}

@WebSocketGateway(3001)
export class MessageGateway
  implements OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private messageService: MessageService) {
    this.messageService.$message.subscribe((message: MessageEntity) => {
      this.$$messageEvent.next({
        event: EventNames.MessageEventName,
        data: message,
      });
    });
  }

  @WebSocketServer()
  private server: Server;
  private $$messageEvent = new Subject<MessageEvent>();
  private websockets = new Map<WebSocket, Subject<MessageEvent>>();

  @SubscribeMessage(EventNames.MessageEventName)
  handleMessageEvent(): Observable<MessageEvent> {
    return this.$$messageEvent.asObservable();
  }

  handleDisconnect(ws: WebSocket): void {
    this.websockets.get(ws).complete();
    this.websockets.get(ws).unsubscribe();
    this.websockets.delete(ws);
  }

  handleConnection(ws: WebSocket): void {
    this.websockets.set(ws, new Subject<MessageEvent>());
  }
}
