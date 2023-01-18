import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    nullable: false,
  })
  accessToken: string;

  @Column({
    nullable: false,
  })
  refreshToken: string;
}
