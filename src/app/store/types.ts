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
  readChat: boolean;
}

export interface ChatMember {
  memberId: string;
  chatId: string;
  lastSeenMessage?: string;
}

export interface Message {
  senderId: string;
  senderImage: string;
  senderName: string;
  chatId: string;
  type: string;
  messageId: string;
  message: string;
  content: string[] | undefined;
  timestamp: string;
}

export interface MessageFromUser {
  chatId: string;
  message: Message;
  senderImage: string;
  senderName: string;
  sentByLoggedInUser: boolean;
}
