import { Module } from "@nestjs/common";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./services/message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entity";
import { MessageGateway } from "./gateways/message.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
})
export class ChatsModule {}
