import { In, Repository } from "typeorm";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "../entities/user.entity";
import { SignUpUserDto } from "../../auth/dto/sign-up-user.dto";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<UserDto[]> {
    return await this.repositoryUser.find();
  }

  async getUsersByIds(usersIds: number[]): Promise<UserDto[]> {
    return this.repositoryUser.find({ where: { id: In(usersIds) } });
  }

  async getUsersByNotIds(usersIds: number[]): Promise<UserDto[]> {
    return this.repositoryUser
      .createQueryBuilder("user")
      .where("user.id NOT IN (:...usersIds)", { usersIds })
      .getMany();
  }

  async getUserByDynamicParams(
    column: string,
    value: string | number,
    selectColumns: string[]
  ): Promise<UserEntity> {
    try {
      return this.repositoryUser
        .createQueryBuilder("user")
        .where(`user.${column} = :value`, { value })
        .select(selectColumns.map((column) => `user.${column}`))
        .getOne();
    } catch (e) {
      throw new HttpException("User not found", 500);
    }
  }

  async createUser(user: SignUpUserDto): Promise<SignUpUserDto> {
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
