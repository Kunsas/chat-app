export interface Message {
  id: string;
  senderId: string;
  type: string;
  creationTime: number;
  chatId: string;
  messageType: string;
  content: string[];
}

export interface MessageWithUser {
  message: Message;
  senderImage: string;
  senderName: string;
  isCurrentUser: boolean;
}
