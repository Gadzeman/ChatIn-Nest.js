import { Injectable } from "@nestjs/common";
import { MessageEntity } from "../entities/message.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "rxjs";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repositoryMessage: Repository<MessageEntity>
  ) {}

  private $$message = new Subject<Partial<MessageEntity>>();
  public $message = this.$$message.asObservable();

  public async getMessages(): Promise<MessageEntity[]> {
    return await this.repositoryMessage.find();
  }

  public async createMessage(message: MessageEntity): Promise<MessageEntity> {
    this.$$message.next(message);
    const createdMessage = await this.repositoryMessage.create({
      ...message,
      datetime: new Date(),
    });
    await this.repositoryMessage.save(createdMessage);
    return createdMessage;
  }
}
