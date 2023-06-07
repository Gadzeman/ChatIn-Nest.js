import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable()
export class GetUsersGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      this.authService.verifyToken(request.headers["authorization"]);
      return true;
    } catch (e) {
      return false;
    }
  }
}
