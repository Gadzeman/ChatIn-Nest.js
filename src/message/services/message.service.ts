import { Injectable } from "@nestjs/common";
import { MessageEntity } from "../entities/message.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repositoryMessage: Repository<MessageEntity>
  ) {}

  public async getMessages(chatId: number): Promise<MessageEntity[]> {
    return await this.repositoryMessage.find({
      where: {
        chatId,
      },
      relations: {
        user: true,
      },
      order: {
        datetime: "ASC",
      },
    });
  }

  public async createMessage(message: MessageEntity): Promise<MessageEntity> {
    const createMessage = await this.repositoryMessage.create({
      ...message,
      datetime: new Date(),
    });

    const createdMessage = await this.repositoryMessage.save(createMessage);

    return this.repositoryMessage.findOne({
      where: { id: createdMessage.id },
      relations: { user: true },
    });
  }
}
