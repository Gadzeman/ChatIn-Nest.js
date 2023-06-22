import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";
import { WsService } from "../../ws/ws.service";
import { UpdateChatUsersDto } from "../dto/add-user-to-chat.dto";
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

  async getChatUsers(
    chatId: number,
    option: "add" | "remove"
  ): Promise<UserDto[]> {
    if (option === "add") {
      const chat = await this.repositoryChat.findOne({
        where: { id: chatId },
        relations: { users: true },
      });

      return await this.usersService.getUsersByNotIds(
        chat.users.map((user) => user.id)
      );
    } else {
      const chat = await this.repositoryChat
        .createQueryBuilder("chat")
        .where("chat.id = :chatId", { chatId })
        .leftJoin("chat.users", "user")
        .where("user.id != chat.ownerId")
        .select(["chat", "user.id", "user.name"])
        .getOne();

      return chat.users;
    }
  }

  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    const createChat = await this.repositoryChat.create({
      ...chat,
      users: [{ id: chat.ownerId }],
      roomId: this.wsService.generateRoomId(),
    });

    return this.repositoryChat.save(createChat);
  }

  async updateChatUsers({
    chatId,
    usersIds,
    option,
  }: UpdateChatUsersDto): Promise<UpdateChatUsersDto> {
    const chat = await this.repositoryChat.findOne({
      where: { id: chatId },
      relations: { users: true },
    });

    const users =
      option === "add"
        ? await this.usersService.getUsersByIds(usersIds)
        : chat.users.filter((user) => !usersIds.find((id) => id === user.id));

    option === "add" ? chat.users.push(...users) : (chat.users = users);

    await this.repositoryChat.save(chat);

    return {
      chatId,
      usersIds,
      option,
    };
  }
}
