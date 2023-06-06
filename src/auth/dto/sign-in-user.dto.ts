import { IsEmail, Length } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  @Length(3, 100)
  email: string;

  password: string;
}
