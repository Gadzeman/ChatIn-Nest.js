import { HttpException, Injectable } from "@nestjs/common";
import { UserEntity } from "../../users/entities/user.entity";
import { hash, compare } from "bcrypt";
import { UsersService } from "../../users/services/users.service";
import { AuthLoginBody } from "../types/auth.types";
import { JwtService } from "@nestjs/jwt";
import { AuthEntity } from "../entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private repositoryAuth: Repository<AuthEntity>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async registerUser(user: UserEntity): Promise<UserEntity> {
    try {
      const { password } = user;

      user.password = await hash(password, 10);

      return this.usersService.createUser(user);
    } catch (e) {
      throw new HttpException("Internal Server Error", 500);
    }
  }
  async loginUser({ email, password }: AuthLoginBody): Promise<AuthEntity> {
    const user = await this.usersService.getUserByDynamicParams("email", email);

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new HttpException("Email or password not valid", 401);
    }

    const accessToken = this.jwtService.sign(
      {},
      { expiresIn: "5m", secret: "chatin-access-token-secret" }
    );

    const refreshToken = this.jwtService.sign(
      {},
      { expiresIn: "30d", secret: "chatin-refresh-token-secret" }
    );

    return this.createAuth({
      id: null,
      userId: user.id,
      accessToken,
      refreshToken,
    });
  }

  logoutUser(): string {
    return "logout user";
  }

  async createAuth(auth: AuthEntity): Promise<AuthEntity> {
    const createdAuth = await this.repositoryAuth.create(auth);

    await this.repositoryAuth.save(createdAuth);

    return createdAuth;
  }
}
