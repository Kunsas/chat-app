export interface Message {
  senderId: string;
  chatId: string;
  type: string;
  content: string[];
}
