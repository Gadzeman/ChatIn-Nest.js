import { Body, Controller, Get, Post } from "@nestjs/common";
import { ChatService } from "../services/chat.service";
import { ChatEntity } from "../entities/chat.entity";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @Get()
  getChats(): Promise<ChatEntity[]> {
    return this.chatsService.getChats();
  }

  @Post()
  createChat(@Body() chat: ChatEntity): Promise<ChatEntity> {
    return this.chatsService.createChat(chat);
  }
}
