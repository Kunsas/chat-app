import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import friendsReducer from "./slices/friends";
import chatsReducer from "./slices/chats";
import chatMembersReducer from "./slices/chatMembers";
import messagesReducer from "./slices/messages";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    friends: friendsReducer,
    chats: chatsReducer,
    chatMembers: chatMembersReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;