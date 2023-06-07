import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthService } from "../auth/services/auth.service";
import { AuthEntity } from "../auth/entities/auth.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
