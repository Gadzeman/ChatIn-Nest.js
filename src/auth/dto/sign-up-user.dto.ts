import { IsEmail, IsIn, Length, Matches } from "class-validator";
import { Exclude } from "class-transformer";
import { UserRoles } from "../../users/entities/user.entity";

export class SignUpUserDto {
  @Length(3, 20)
  name: string;

  @IsEmail()
  @Length(3, 100)
  email: string;

  @Length(4)
  password: string;

  @IsIn([UserRoles.user, UserRoles.admin])
  role: UserRoles;
}
