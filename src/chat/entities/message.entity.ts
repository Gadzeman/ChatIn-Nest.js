import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    chatId: number;

    @Column({
        nullable: false
    })
    userId: number

    @Column({
        nullable: false,
    })
    text: string;

    @Column({
        default: new Date()
    })
    datetime: Date;
}
