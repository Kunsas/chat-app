import { User, users } from "./users";
import { v4 as uuidv4 } from "uuid";

export interface Chat {
  id: string;
  isGroup: boolean;
  participants: User[];
}

export const chats: Chat[] = [
  {
    id: uuidv4(),
    isGroup: true,
    participants: [users[0], users[1], users[3]],
  },
  {
    id: uuidv4(),
    isGroup: false,
    participants: [users[2]],
  },
];
