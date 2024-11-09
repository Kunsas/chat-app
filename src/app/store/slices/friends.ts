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
    findFriendBySender: (state, action: PayloadAction<string>) => {
      state.foundFriendBySender =
        state.friends.find(
          (friend) => friend.sender.username.toLowerCase() === action.payload
        ) || null;
    },
    // takes receiver username
    findFriendByReceiver: (state, action: PayloadAction<string>) => {
      state.foundFriendByReceiver =
        state.friends.find(
          (friend) => friend.receiver.username.toLowerCase() === action.payload
        ) || null;
    },
    // takes chatId
    findUserByChatId: (state, action: PayloadAction<string>) => {
      state.foundFriendsByChatId =
        state.friends.find((friend) => friend.chatId === action.payload) ||
        null;
    },
  },
});

export const { addFriend } = FriendsSlice.actions;
export default FriendsSlice.reducer;
