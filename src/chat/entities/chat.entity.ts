import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { UserDto } from "../../user/dto/user.dto";
import { JoinTable } from "typeorm";

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ownerId: number;

  @ManyToOne(() => UserEntity, (user) => user)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserDto[];
}
