import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./db/db.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ChatModule,
    DbModule,
    UserModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
