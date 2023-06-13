import { UserDto } from "../../user/dto/user.dto";

export class ChatDto {
  id: number;
  name: string;
  owner: number | UserDto;
}
