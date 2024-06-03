import { ChatType } from "./chat-type";
import { UserType } from "./user";

export type MessageType = {
  id: string;
  message: string;
  user: UserType;
  userId: string;
  chat: ChatType;
  chatId: string;
  createdAt: Date;
};
