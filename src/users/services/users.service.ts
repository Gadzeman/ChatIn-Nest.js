import { Repository } from "typeorm";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.repositoryUser.find();
  }

  async getUserByDynamicParams(
    column: string,
    value: string | number
  ): Promise<UserEntity> {
    try {
      return await this.repositoryUser.findOne({
        where: { [column]: value },
      });
    } catch (e) {
      throw new HttpException("User not found", 500);
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      const createdUser = await this.repositoryUser.create(user);

      await this.repositoryUser.save(createdUser);

      delete createdUser.password;

      return createdUser;
    } catch (e) {
      throw new HttpException("User not created", 500);
    }
  }

  async deleteUser(id: number): Promise<number> {
    try {
      await this.repositoryUser.delete(id);

      return id;
    } catch (e) {
      throw new HttpException("User not deleted", 500);
    }
  }
}
