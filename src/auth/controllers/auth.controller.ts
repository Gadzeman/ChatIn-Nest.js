import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../../users/entities/user.entity";
import { AuthLoginBody } from "../types/auth.types";
import { AuthEntity } from "../entities/auth.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() body: UserEntity): Promise<UserEntity> {
    return await this.authService.registerUser(body);
  }

  @Post("login")
  async loginUser(@Body() body: AuthLoginBody): Promise<AuthEntity> {
    return await this.authService.loginUser(body);
  }

  @Post("logout")
  logoutUser(): string {
    return this.authService.logoutUser();
  }
}
