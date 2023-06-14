import { UserDto } from "../../user/dto/user.dto";

export class ChatDto {
  id: number;
  name: string;
  ownerId: number;
  owner: UserDto;
}
