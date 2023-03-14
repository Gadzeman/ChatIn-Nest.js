import {Body, Controller, Post} from "@nestjs/common";
import {ChatService} from "../services/chat.service";
import {MessageEntity} from "../entities/message.entity";

@Controller('chat')
export class ChatController {
    constructor(
       private readonly chatService: ChatService
    ) {}

    @Post()
    createMessage(@Body() message: MessageEntity) {
        console.log(123)
        return this.chatService.createMessage(message);
    }
}
