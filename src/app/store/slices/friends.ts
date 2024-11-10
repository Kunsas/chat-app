import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend, User } from "../types";

interface FriendsState {
  friends: Friend[];
  foundFriendBySender?: Friend | null;
  foundFriendByReceiver?: Friend | null;
  foundFriendsByChatId?: Friend | null;
}

const initialState: FriendsState = {
  friends: [],
};

export const FriendsSlice = createSlice({
  name: "Friends",
  initialState,
  reducers: {
    // takes Friend object
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
    },
    // take sender username
    findFriendsBySender: (state, action: PayloadAction<string>) => {
      state.foundFriendBySender =
        state.friends.find(
          (friend) => friend.sender.username.toLowerCase() === action.payload
        ) || null;
    },
    // takes receiver username
    findFriendsByReceiver: (state, action: PayloadAction<string>) => {
      state.foundFriendByReceiver =
        state.friends.find(
          (friend) => friend.receiver.username.toLowerCase() === action.payload
        ) || null;
    },
    // takes chatId
    findFriendsByChatId: (state, action: PayloadAction<string>) => {
      state.foundFriendsByChatId =
        state.friends.find((friend) => friend.chatId === action.payload) ||
        null;
    },
    // takes chatId
    deleteFriendsByChatId: (state, action: PayloadAction<string>) => {
      if (state.foundFriendsByChatId?.chatId === action.payload) {
        state.foundFriendsByChatId = null;
      }
      state.friends = state.friends.filter(
        (friend) => friend.chatId !== action.payload
      );
    },
  },
});

export const {
  addFriend,
  findFriendsBySender,
  findFriendsByReceiver,
  findFriendsByChatId,
  deleteFriendsByChatId,
} = FriendsSlice.actions;
export default FriendsSlice.reducer;
