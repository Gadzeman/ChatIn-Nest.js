import { UserRoles } from "../entities/user.entity";

export class UserDto {
  id: number;

  name: string;

  email: string;

  password: string;

  role: UserRoles;
}
