import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types";

interface MessagesState {
  messages: Message[];
  foundMessageByChatId?: Message | null;
}

const initialState: MessagesState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // takes a Message object
    createMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    // takes Message's chatId
    findChatMembersByChatId: (state, action: PayloadAction<string>) => {
      state.foundMessageByChatId = state.messages.find((message) => {
        message.chatId === action.payload;
      });
    },
    // takes Message's chatId
    deleteMessagesByChatId: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((message) => {
        message.chatId === action.payload;
      });
    },
  },
});

export const {
  createMessage,
  findChatMembersByChatId,
  deleteMessagesByChatId,
} = messagesSlice.actions;
export default messagesSlice.reducer;
