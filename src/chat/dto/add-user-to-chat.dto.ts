export class UpdateChatUsersDto {
  usersIds: number[];
  chatId: number;
  option: "add" | "remove";
}
