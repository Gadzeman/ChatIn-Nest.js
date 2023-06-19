import { Injectable } from "@nestjs/common";

@Injectable()
export class WsService {
  public generateRoomId(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}-${random}`;
  }
}
