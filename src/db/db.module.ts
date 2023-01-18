import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 54321,
      username: "root",
      password: "root",
      database: "chatin-db",
      entities: [__dirname + "../../**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
