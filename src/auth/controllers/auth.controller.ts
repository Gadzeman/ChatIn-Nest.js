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
import { AuthEntity } from "../entities/auth.entity";
import { SignUpUserDto } from "../dto/sign-up-user.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { SignInUserDto } from "../dto/sign-in-user.dto";

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
  async loginUser(@Body() body: SignInUserDto): Promise<AuthEntity> {
    return await this.authService.signInUser(body);
  }

  @Post("logout")
  logoutUser(): string {
    return this.authService.logoutUser();
  }

  @Put("refresh-token")
  async refreshToken(@Body() body: RefreshTokenDto): Promise<AuthEntity> {
    return await this.authService.refreshToken(body);
  }
}
