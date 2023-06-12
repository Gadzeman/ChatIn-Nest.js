import { Body, Controller, Get, Post } from "@nestjs/common";
import { MessageService } from "../services/message.service";
import { MessageEntity } from "../entities/message.entity";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(): Promise<MessageEntity[]> {
    return await this.messageService.getMessages();
  }

  @Post()
  async createMessage(@Body() message: MessageEntity): Promise<MessageEntity> {
    return await this.messageService.createMessage(message);
  }
}
