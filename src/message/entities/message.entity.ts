import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatEntity } from "../../chat/entities/chat.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  chatId: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @Column({
    nullable: false,
  })
  text: string;

  @Column({
    default: new Date(),
  })
  datetime: Date;

  @ManyToOne(() => ChatEntity, (chat) => chat, {
    onDelete: "CASCADE",
  })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user)
  user: UserEntity;
}
