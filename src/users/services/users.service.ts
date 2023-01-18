import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUserInfo: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.repositoryUserInfo.find();
  }
}
