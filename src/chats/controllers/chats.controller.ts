import { Body, Controller, Get, Post } from "@nestjs/common";
import { ChatsService } from "../services/chats.service";
import { ChatEntity } from "../entities/chat.entity";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  getChats(): Promise<ChatEntity[]> {
    return this.chatsService.getChats();
  }

  @Post()
  createChat(@Body() chat: ChatEntity): Promise<ChatEntity> {
    return this.chatsService.createChat(chat);
  }
}
