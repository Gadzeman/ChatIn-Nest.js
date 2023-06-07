import { IsString } from "class-validator";

export class AuthAccessTokenDto {
  @IsString()
  token: string;
}
