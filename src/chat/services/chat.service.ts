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
    const createChat = await this.repositoryChat.create({
      ...chat,
      users: [{ id: chat.ownerId }],
    });
    return this.repositoryChat.save(createChat);
  }
}
