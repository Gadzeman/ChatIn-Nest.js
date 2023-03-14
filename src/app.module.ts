import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./db/db.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";

@Module({
  imports: [
      AuthModule,
      ChatModule,
      DbModule,
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
