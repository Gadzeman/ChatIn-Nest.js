import {Injectable} from "@nestjs/common";
import {MessageEntity} from "../entities/message.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly repositoryMessage: Repository<MessageEntity>
    ) {}

    public async createMessage(message: MessageEntity) {
        const createdMessage = await this.repositoryMessage.create({
            ...message,
            datetime: new Date(),
        });
        await this.repositoryMessage.save(createdMessage);
        return createdMessage;
    }
}
