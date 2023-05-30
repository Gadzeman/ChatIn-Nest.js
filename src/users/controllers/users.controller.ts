import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersService.getUsers();
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<number> {
    return this.usersService.deleteUser(id);
  }
}
