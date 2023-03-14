import {Module} from "@nestjs/common";
import {ChatController} from "./controllers/chat.controller";
import {ChatService} from "./services/chat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "./entities/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule {}
