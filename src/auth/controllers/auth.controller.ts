import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../../users/entities/user.entity";
import { AuthSignInBody, RefreshTokenBody } from "../types/auth.types";
import { AuthEntity } from "../entities/auth.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("access-token")
  getAccessToken(): Promise<AuthEntity[]> {
    return this.authService.getAccessToken();
  }

  @Post("sign-up")
  async signUpUser(@Body() body: UserEntity): Promise<UserEntity> {
    return await this.authService.signUpUser(body);
  }

  @Post("sign-in")
  async loginUser(@Body() body: AuthSignInBody): Promise<AuthEntity> {
    return await this.authService.signInUser(body);
  }

  @Post("logout")
  logoutUser(): string {
    return this.authService.logoutUser();
  }

  @Put("refresh-token")
  async refreshToken(@Body() body: RefreshTokenBody): Promise<AuthEntity> {
    return await this.authService.refreshToken(body);
  }
}
