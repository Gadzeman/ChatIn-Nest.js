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

  getChats(userId: number): Promise<ChatEntity[]> {
    return this.repositoryChat.find({
      relations: {
        users: true,
      },
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    const createdChat = await this.repositoryChat.create(chat);
    await this.repositoryChat.save(createdChat);
    return createdChat;
  }
}
