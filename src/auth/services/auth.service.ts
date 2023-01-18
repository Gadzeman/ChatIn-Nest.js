import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  registerUser(): string {
    return "register user";
  }
  loginUser(): string {
    return "login user";
  }
  logoutUser(): string {
    return "logout user";
  }
}
