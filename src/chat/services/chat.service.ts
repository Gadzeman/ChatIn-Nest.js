import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";
import { WsService } from "../../ws/ws.service";

@Injectable({})
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly repositoryChat: Repository<ChatEntity>,
    private wsService: WsService
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

  async getChatUserIds(chatId: number): Promise<number[]> {
    const chat = await this.repositoryChat.findOne({
      relations: {
        users: true,
      },
      where: {
        id: chatId,
      },
    });

    return chat.users.map((user) => user.id);
  }

  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    const createChat = await this.repositoryChat.create({
      ...chat,
      users: [{ id: chat.ownerId }],
      roomId: this.wsService.generateRoomId(),
    });
    return this.repositoryChat.save(createChat);
  }
}
