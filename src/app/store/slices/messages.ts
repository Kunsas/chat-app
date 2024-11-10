import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types";

interface MessagesState {
  messages: Message[];
  foundMessageByChatId?: Message;
  foundMessagesBySenderId?: Message;
  foundContentOfMessagesByChatId?: string[];
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
    // takes Message's messageId and message
    updateContentInMessagesByMessageId: (
      state,
      action: PayloadAction<{ messageId: string; messageContent: string }>
    ) => {
      console.log(action.payload.messageId, action.payload.messageContent);
      state.messages = state.messages.map((message) => {
        if (message.messageId === action.payload.messageId) {
          const updatedContent = message.content ? [...message.content] : [];
          updatedContent.push(action.payload.messageContent);
          return {
            ...message,
            content: updatedContent,
          };
        }
        return message;
      });
    },
    // takes Message's chatId
    findMessagesByChatId: (state, action: PayloadAction<string>) => {
      state.foundMessageByChatId = state.messages.find(
        (message) => message.chatId === action.payload
      );
    },
    // takes Messages's chatId
    findContentOfMessagesByChatId: (state, action: PayloadAction<string>) => {
      const message = state.messages.find(
        (msg) => msg.chatId === action.payload
      );
      if (message) {
        state.foundContentOfMessagesByChatId = message.content;
      } else {
        state.foundContentOfMessagesByChatId = [];
      }
    },
    findMessagesBySenderId: (state, action: PayloadAction<string>) => {
      state.foundMessagesBySenderId = state.messages.find(
        (message) => message.senderId === action.payload
      );
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
  updateContentInMessagesByMessageId,
  findMessagesByChatId,
  deleteMessagesByChatId,
  findMessagesBySenderId,
  findContentOfMessagesByChatId,
} = messagesSlice.actions;
export default messagesSlice.reducer;
