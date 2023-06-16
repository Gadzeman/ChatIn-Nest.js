import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "../services/message.service";
import { MessageEntity } from "../entities/message.entity";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get("/:userId")
  async getMessages(@Param("userId") userId: number): Promise<MessageEntity[]> {
    return this.messageService.getMessages(userId);
  }

  @Post()
  async createMessage(@Body() message: MessageEntity): Promise<MessageEntity> {
    return await this.messageService.createMessage(message);
  }
}
