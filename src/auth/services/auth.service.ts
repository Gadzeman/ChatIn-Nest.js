import { HttpException, Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { UsersService } from "../../users/services/users.service";
import { AuthSignInBody, RefreshTokenBody } from "../types/auth.types";
import { JwtService } from "@nestjs/jwt";
import { AuthEntity } from "../entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignUpUserDto } from "../dto/sign-up-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private repositoryAuth: Repository<AuthEntity>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getAccessToken(): Promise<AuthEntity[]> {
    return this.repositoryAuth.find();
  }

  async signUpUser(user: SignUpUserDto): Promise<SignUpUserDto> {
    try {
      const { password } = user;

      user.password = await hash(password, 10);

      return this.usersService.createUser(user);
    } catch (e) {
      throw new HttpException("Bad request", 400);
    }
  }

  async signInUser({ email, password }: AuthSignInBody): Promise<AuthEntity> {
    const user = await this.usersService.getUserByDynamicParams("email", email);

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new HttpException("Email or password not valid", 401);
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: "3m", secret: "chatin-access-token-secret" }
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id },
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

  async refreshToken({ userId }: RefreshTokenBody): Promise<AuthEntity> {
    const auth = await this.repositoryAuth.findOne({ where: { userId } });

    try {
      !this.jwtService.verify(auth.refreshToken, {
        secret: "chatin-refresh-token-secret",
      });
    } catch (e) {
      await this.repositoryAuth.delete(auth.id);

      throw new HttpException("Refresh token expired or not valid", 403);
    }

    const accessToken = this.jwtService.sign(
      { userId },
      { expiresIn: "3m", secret: "chatin-access-token-secret" }
    );

    await this.repositoryAuth.update({ userId }, { accessToken });

    auth.accessToken = accessToken;

    return auth;
  }

  async createAuth(auth: AuthEntity): Promise<AuthEntity> {
    const existedAuth = await this.repositoryAuth.findOne({
      where: { userId: auth.userId },
    });
    if (existedAuth) {
      await this.repositoryAuth.update(
        { id: existedAuth.id },
        {
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        }
      );

      return existedAuth;
    }
    const createdAuth = await this.repositoryAuth.create(auth);

    await this.repositoryAuth.save(createdAuth);

    return createdAuth;
  }
}
