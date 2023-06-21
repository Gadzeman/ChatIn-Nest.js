import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ChatService } from "../services/chat.service";
import { ChatEntity } from "../entities/chat.entity";
import { AddUserToChatDto } from "../dto/add-user-to-chat.dto";
import { UserDto } from "../../user/dto/user.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @Get("/:userId")
  getChats(@Param("userId") userId: number): Promise<ChatEntity[]> {
    return this.chatsService.getChats(userId);
  }

  @Get("/users/:chatId")
  getChatUsers(@Param("chatId") chatId: number): Promise<UserDto[]> {
    return this.chatsService.getChatUsers(chatId);
  }

  @Post()
  createChat(@Body() chat: ChatEntity): Promise<ChatEntity> {
    return this.chatsService.createChat(chat);
  }

  @Post("/add-user-to-chat")
  addUserToChat(@Body() data: AddUserToChatDto): Promise<AddUserToChatDto> {
    return this.chatsService.addUserToChat(data);
  }
}
