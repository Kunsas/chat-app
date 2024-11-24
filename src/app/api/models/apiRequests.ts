export interface ChatDetailsResponse {
  _id: string;
  chatName: string;
  chatImageUrl: string;
}

export interface MessageDetailsResponse {
  _id: string;
  senderImage: string;
  senderName: string;
  content: string;
  createdAt: Date;
  type: string;
}

export interface UserDetailsResponse {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}
