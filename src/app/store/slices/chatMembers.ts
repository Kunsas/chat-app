import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMember } from "../types";

interface ChatMembersState {
  chatMembers: ChatMember[];
  foundChatMembersByMemberId?: ChatMember[] | null;
  foundChatMembersByChatId?: ChatMember[] | null;
  foundChatMembersByMemberIdAndChatId?: ChatMember[] | null;
}

const initialState: ChatMembersState = {
  chatMembers: [],
};

export const chatMembersSlice = createSlice({
  name: "chatMembers",
  initialState,
  reducers: {
    // takes a ChatMember's object
    addChatMembers: (state, action: PayloadAction<ChatMember>) => {
      state.chatMembers.push(action.payload);
    },
    // takes ChatMember's memberId
    findChatMembersByMemberId: (state, action: PayloadAction<string>) => {
      state.foundChatMembersByMemberId = state.chatMembers.filter(
        (chatMember) => {
          chatMember.memberId === action.payload;
        }
      );
    },
    // takes ChatMember's memberId and chatId
    updateLastSeenMessageInChatMemberByMemberIdAndChatId: (
      state,
      action: PayloadAction<{
        memberId: string;
        chatId: string;
        message: string;
      }>
    ) => {
      const chatMember = state.chatMembers.find(
        (chatMember) =>
          chatMember.memberId === action.payload.memberId &&
          chatMember.chatId === action.payload.chatId
      );
      if (chatMember) {
        chatMember.lastSeenMessage = action.payload.message;
      }
    },
    // takes ChatMember's chatId
    findChatMembersByChatId: (state, action: PayloadAction<string>) => {
      state.foundChatMembersByChatId = state.chatMembers.filter(
        (chatMember) => {
          chatMember.chatId === action.payload;
        }
      );
    },
    // takes ChatMember's memberId and chatId
    findChatMembersByMemberIdAndChatId: (
      state,
      action: PayloadAction<{ memberId: string; chatId: string }>
    ) => {
      state.foundChatMembersByChatId = state.chatMembers.filter(
        (chatMember) => {
          chatMember.memberId === action.payload.memberId &&
            chatMember.chatId === action.payload.chatId;
        }
      );
    },
    // takes ChatMember's memberId and chatId
    deleteChatMembersByChatId: (state, action: PayloadAction<string>) => {
      state.chatMembers = state.chatMembers.filter(
        (chatMember) => !(chatMember.chatId === action.payload)
      );
    },
  },
});

export const {
  addChatMembers,
  findChatMembersByMemberId,
  findChatMembersByChatId,
  findChatMembersByMemberIdAndChatId,
  updateLastSeenMessageInChatMemberByMemberIdAndChatId,
  deleteChatMembersByChatId,
} = chatMembersSlice.actions;
export default chatMembersSlice.reducer;
