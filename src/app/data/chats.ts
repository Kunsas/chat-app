import { toast } from "sonner";
import { User, users } from "./users";

export interface Chat {
  id: string;
  isGroup: boolean;
  name?: string;
  image: string;
  participants: User[];
  lastSentMessage: string;
}

export const chats: Chat[] = [
  {
    id: "1",
    isGroup: true,
    name: "Dev Team",
    image: "group",
    participants: [users[0], users[1], users[3]],
    lastSentMessage: "Sample last message",
  },
  {
    id: "2",
    isGroup: false,
    name: users[2].username,
    image: users[2].image,
    participants: [users[2]],
    lastSentMessage: "Sample last message",
  },
];

export const addChat = (chat: Chat, existingChats: Chat[]) => {
  chats.push(chat);
  console.log(chats);
};
