import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";

@Injectable({})
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly repositoryChat: Repository<ChatEntity>
  ) {}

  getChats(): Promise<ChatEntity[]> {
    return this.repositoryChat.find({
      relations: {
        owner: true,
      },
    });
  }

  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    const createdChat = await this.repositoryChat.create(chat);
    await this.repositoryChat.save(createdChat);
    return createdChat;
  }
}
