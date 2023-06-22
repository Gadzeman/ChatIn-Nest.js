import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ChatService } from "../services/chat.service";
import { ChatEntity } from "../entities/chat.entity";
import { UpdateChatUsersDto } from "../dto/add-user-to-chat.dto";
import { UserDto } from "../../user/dto/user.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @Get("/:userId")
  getChats(@Param("userId") userId: number): Promise<ChatEntity[]> {
    return this.chatsService.getChats(userId);
  }

  @Get("/users/:chatId/:option")
  getChatUsers(
    @Param("chatId") chatId: number,
    @Param("option") option: "add" | "remove"
  ): Promise<UserDto[]> {
    return this.chatsService.getChatUsers(chatId, option);
  }

  @Post()
  createChat(@Body() chat: ChatEntity): Promise<ChatEntity> {
    return this.chatsService.createChat(chat);
  }

  @Put("/users")
  updateChatUsers(
    @Body() data: UpdateChatUsersDto
  ): Promise<UpdateChatUsersDto> {
    return this.chatsService.updateChatUsers(data);
  }
}
