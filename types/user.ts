import { ChatType } from "./chat-type";

export type UserType = {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  secondaryName: string;
  chat: ChatType[]
};
