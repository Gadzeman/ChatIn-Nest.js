import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoles {
  admin = "admin",
  user = "user",
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gmail: string;

  @Column()
  role: UserRoles;
}
