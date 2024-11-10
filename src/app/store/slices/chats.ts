import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../types";
import { v4 as uuidv4 } from "uuid";

interface ChatsState {
  chats: Chat[];
  foundChatByChatId?: Chat | null;
}

const initialState: ChatsState = {
  chats: [
    {
      chatId: "1",
      name: "Delete this to See Default Chats Layout",
      isGroup: true,
      image: "",
      lastMessage: "hi",
      readChat: true,
    },
    {
      chatId: "2",
      name: "Millie",
      isGroup: false,
      image: "user_3.png",
      lastMessage: "Good day!",
      readChat: false,
    },
  ],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    // takes Chat object
    createChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    // takes chatId
    findChatById: (state, action: PayloadAction<string>) => {
      state.foundChatByChatId =
        state.chats.find((chat) => chat.chatId === action.payload) || null;
    },
    // takes Chat's chatId and message
    updateLastMessageInChatByChatId: (
      state,
      action: PayloadAction<{ chatId: string; message: string }>
    ) => {
      const chat = state.chats.find(
        (chat) => chat.chatId === action.payload.chatId
      );
      if (chat) {
        chat.lastMessage = action.payload.message;
      }
    },
    // takes chatId
    deleteChat: (state, action: PayloadAction<string>) => {
      if (state.foundChatByChatId?.chatId === action.payload) {
        state.foundChatByChatId = null;
      }
      state.chats = state.chats.filter(
        (chat) => chat.chatId !== action.payload
      );
    },
  },
});

export const {
  createChat,
  deleteChat,
  findChatById,
  updateLastMessageInChatByChatId,
} = chatsSlice.actions;
export default chatsSlice.reducer;
