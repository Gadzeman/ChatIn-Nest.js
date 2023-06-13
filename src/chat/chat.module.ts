import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from "./controllers/chat.controller";
import { ChatEntity } from "./entities/chat.entity";
import { ChatService } from "./services/chat.service";
import { ChatGateway } from "./gateways/chat.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}