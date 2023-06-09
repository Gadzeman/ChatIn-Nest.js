import { Module } from "@nestjs/common";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./services/message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entity";
import { MessageGateway } from "./gateways/message.gateway";
import { ChatController } from "./controllers/chat.controller";
import { ChatEntity } from "./entities/chat.entity";
import { ChatService } from "./services/chat.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ChatEntity])],
  controllers: [MessageController, ChatController],
  providers: [MessageService, ChatService, MessageGateway],
  exports: [MessageService, ChatService],
})
export class ChatModule {}
