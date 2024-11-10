import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageFromUser } from "../types";
import { format } from "date-fns";

interface MessageFromUsersState {
  messageFromUsers: MessageFromUser[];
  foundMessageFromUsersByMessageIdAndSenderId?: MessageFromUser;
  foundMessageFromUsersByChatId?: MessageFromUser[];
  isLastMessageFromUserId?: boolean;
}

const initialState: MessageFromUsersState = {
  messageFromUsers: [
    {
      chatId: "1",
      message: {
        senderId: "1",
        senderImage: "user_1.png",
        senderName: "Ali",
        chatId: "1",
        type: "text",
        messageId: "1",
        message: "hi",
        content: ["hi"],
        timestamp: format(new Date().getTime() + 180 * 1000, "HH:mm"),
      },
      senderImage: "public/user_1.png",
      senderName: "Ali",
      sentByLoggedInUser: true,
    },
    {
      chatId: "1",
      message: {
        senderId: "2",
        senderImage: "user_2.png",
        senderName: "Alicent",
        chatId: "1",
        type: "text",
        messageId: "2",
        message: "hello",
        content: ["hi, hello"],
        timestamp: format(new Date().getTime() + 120 * 1000, "HH:mm"),
      },
      senderImage: "public/user_2.png",
      senderName: "Alicent",
      sentByLoggedInUser: false,
    },
    {
      chatId: "1",
      message: {
        senderId: "3",
        senderImage: "user_3.png",
        senderName: "Millie",
        chatId: "1",
        type: "text",
        messageId: "3",
        message: "hey",
        content: ["hi", "hello", "hey"],
        timestamp: format(new Date().getTime() + 60 * 1000, "HH:mm"),
      },
      senderImage: "public/user_3.png",
      senderName: "Millie",
      sentByLoggedInUser: false,
    },
    {
      chatId: "1",
      message: {
        senderId: "4",
        senderImage: "user_4.png",
        senderName: "Bob",
        chatId: "1",
        type: "text",
        messageId: "4",
        message: "hola",
        content: ["hi", "hello", "hey", "hola"],
        timestamp: format(new Date().getTime(), "HH:mm"),
      },
      senderImage: "public/user_4.png",
      senderName: "Bob",
      sentByLoggedInUser: false,
    },
    {
      chatId: "2",
      message: {
        senderId: "3",
        senderImage: "user_3.png",
        senderName: "Millie",
        chatId: "2",
        type: "text",
        messageId: "5",
        message: "Good day!",
        content: ["hi", "hello", "hey", "hola", "Good day!"],
        timestamp: format(new Date(), "HH:mm"),
      },
      senderImage: "public/user_3.png",
      senderName: "Millie",
      sentByLoggedInUser: false,
    },
  ],
};

export const messageFromUsersSlice = createSlice({
  name: "messageFromUsers",
  initialState,
  reducers: {
    // takes MessageFromUser object
    createMessageFromUser: (state, action: PayloadAction<MessageFromUser>) => {
      state.messageFromUsers.push(action.payload);
    },
    // takes MessageFromUser's messageId and chatId
    findMessageFromUsersByMessageIdAndSenderId: (
      state,
      action: PayloadAction<{ messageId: string; senderId: string }>
    ) => {
      state.foundMessageFromUsersByMessageIdAndSenderId =
        state.messageFromUsers.find(
          (messageFromUser) =>
            messageFromUser.message?.messageId === action.payload.messageId &&
            messageFromUser.message?.senderId === action.payload.senderId
        ) || undefined;
    },
    // takes MessageFromUser's chatId
    findMessageFromUsersByChatId: (state, action: PayloadAction<string>) => {
      state.foundMessageFromUsersByChatId =
        state.messageFromUsers.filter(
          (messageFromUser) => messageFromUser.chatId === action.payload
        ) || undefined;
    },
    // takes MessageFromUser's Messages's userId
    findLastMessageFromUser: (state, action: PayloadAction<string>) => {
      state.isLastMessageFromUserId =
        state.messageFromUsers
          .slice()
          .sort(
            (a, b) =>
              new Date(b.message.timestamp).getTime() -
              new Date(a.message.timestamp).getTime()
          )[0].message.senderId === action.payload;
    },
    // takes MessageFromUser's messageId and chatId
    deleteMessageFromUserByMessageIdAndUserId: (
      state,
      action: PayloadAction<MessageFromUser>
    ) => {
      state.messageFromUsers = state.messageFromUsers.filter(
        (messageFromUser) => {
          messageFromUser.message?.messageId ===
            action.payload.message?.messageId &&
            messageFromUser.message?.senderId ===
              action.payload.message?.messageId;
        }
      );
    },
  },
});

export const {
  createMessageFromUser,
  findMessageFromUsersByMessageIdAndSenderId,
  deleteMessageFromUserByMessageIdAndUserId,
  findMessageFromUsersByChatId,
  findLastMessageFromUser,
} = messageFromUsersSlice.actions;
export default messageFromUsersSlice.reducer;
