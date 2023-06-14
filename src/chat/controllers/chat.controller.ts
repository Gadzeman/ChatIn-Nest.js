import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ChatService } from "../services/chat.service";
import { ChatEntity } from "../entities/chat.entity";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @Get("/:userId")
  getChats(@Param("userId") userId: number): Promise<ChatEntity[]> {
    return this.chatsService.getChats(userId);
  }

  @Post()
  createChat(@Body() chat: ChatEntity): Promise<ChatEntity> {
    return this.chatsService.createChat(chat);
  }
}
