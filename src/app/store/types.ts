export interface User {
  username: string;
  image: string;
  userId: string;
  email: string;
}

export interface Friend {
  sender: User;
  receiver: User;
  chatId: string;
}

export interface Chat {
  chatId: string;
  name?: string;
  isGroup: boolean;
  image: string;
  lastMessage?: string;
}

export interface ChatMember {
  memberId: string;
  chatId: string;
  lastSeenMessage?: string;
}

export interface Message {
  senderId: string;
  chatId: string;
  type: string;
  content: string[];
}
