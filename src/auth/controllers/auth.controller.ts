import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthSignInBody, RefreshTokenBody } from "../types/auth.types";
import { AuthEntity } from "../entities/auth.entity";
import { SignUpUserDto } from "../dto/sign-up-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("access-token")
  getAccessToken(): Promise<AuthEntity[]> {
    return this.authService.getAccessToken();
  }

  @Post("sign-up")
  @UsePipes(ValidationPipe)
  async signUpUser(@Body() body: SignUpUserDto): Promise<SignUpUserDto> {
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
