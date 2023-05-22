import { Module } from "@nestjs/common";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./services/message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entity";
import { MessageGateway } from "./gateways/message.gateway";
import { ChatsController } from "./controllers/chats.controller";
import { ChatEntity } from "./entities/chat.entity";
import { ChatsService } from "./services/chats.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ChatEntity])],
  controllers: [MessageController, ChatsController],
  providers: [MessageService, ChatsService, MessageGateway],
  exports: [MessageService, ChatsService],
})
export class ChatsModule {}
