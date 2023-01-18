import { Controller } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  registerUser(): string {
    return this.authService.registerUser();
  }
  loginUser(): string {
    return this.authService.loginUser();
  }
  logoutUser(): string {
    return this.authService.logoutUser();
  }
}
