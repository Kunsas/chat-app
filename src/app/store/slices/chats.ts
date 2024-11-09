import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../types";

interface ChatsState {
  chats: Chat[];
  foundChatByChatId?: Chat | null;
}

const initialState: ChatsState = {
  chats: [],
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

export const { createChat, deleteChat, findChatById } = chatsSlice.actions;
export default chatsSlice.reducer;
