import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDto } from "../dto/user.dto";
import { GetUsersGuard } from "../guards/get-users.guard";

@Controller("user")
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @UseGuards(GetUsersGuard)
  async getUsers(): Promise<UserDto[]> {
    return await this.usersService.getUsers();
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<number> {
    return this.usersService.deleteUser(id);
  }
}
