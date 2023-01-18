import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersService.getUsers();
  }
}
