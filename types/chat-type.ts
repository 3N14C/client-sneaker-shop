import { MessageType } from "./message-type";
import { UserType } from "./user";

export type ChatType = {
  id: string;
  user: UserType[];
  message: MessageType[];
};
