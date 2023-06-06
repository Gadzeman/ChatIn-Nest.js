import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserDto } from "../dto/user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.usersService.getUsers();
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<number> {
    return this.usersService.deleteUser(id);
  }
}
