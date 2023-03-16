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

  public async createMessage(message: MessageEntity): Promise<MessageEntity> {
    const createdMessage = await this.repositoryMessage.create({
      ...message,
      datetime: new Date(),
    });
    await this.repositoryMessage.save(createdMessage);
    this.$$message.next(message);
    return createdMessage;
  }
}
