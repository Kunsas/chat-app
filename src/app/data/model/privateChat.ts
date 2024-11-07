import { User } from "./user";

export interface PrivateChat {
  chatId: string;
  firstParticipant: User;
  SecondParticipant: User;
}
