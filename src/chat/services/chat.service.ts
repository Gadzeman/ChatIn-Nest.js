import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";
import { WsService } from "../../ws/ws.service";
import { AddUserToChatDto } from "../dto/add-user-to-chat.dto";
import { UserService } from "../../user/services/user.service";
import { UserDto } from "../../user/dto/user.dto";

@Injectable({})
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly repositoryChat: Repository<ChatEntity>,
    private usersService: UserService,
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

  async getChatUsers(chatId: number): Promise<UserDto[]> {
    const chat = await this.repositoryChat
      .createQueryBuilder("chat")
      .where("chat.id = :chatId", { chatId })
      .leftJoin("chat.users", "users")
      .select(["chat", "users.id", "users.name"])
      .getOne();

    return chat.users;
  }

  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    const createChat = await this.repositoryChat.create({
      ...chat,
      users: [{ id: chat.ownerId }],
      roomId: this.wsService.generateRoomId(),
    });

    return this.repositoryChat.save(createChat);
  }

  async addUserToChat({
    chatId,
    usersIds,
  }: AddUserToChatDto): Promise<AddUserToChatDto> {
    const users = await this.usersService.getUsersByIds(usersIds);

    const chat = await this.repositoryChat.findOne({
      where: { id: chatId },
      relations: { users: true },
    });

    chat.users.push(...users);

    await this.repositoryChat.save(chat);

    return {
      chatId,
      usersIds,
    };
  }
}
