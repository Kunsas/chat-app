import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

interface UsersState {
  users: User[];
  foundUserByName?: User | null;
  foundUserById?: User | null;
  loggedInUser: User;
}

const initialState: UsersState = {
  users: [
    {
      userId: "1",
      username: "Ali",
      image: "user_1.png",
      email: "ali@sample.com",
    },
    {
      userId: uuidv4(),
      username: "Alicent",
      image: "user_2.png",
      email: "alicent@sample.com",
    },
    {
      userId: uuidv4(),
      username: "Millie",
      image: "user_3.png",
      email: "millie@sample.com",
    },
    {
      userId: uuidv4(),
      username: "Bob",
      image: "user_4.png",
      email: "bob@sample.com",
    },
  ],
  loggedInUser: {
    userId: "1",
    username: "Ali",
    image: "user_1.png",
    email: "ali@sample.com",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoggedInUser: (state) => {
      state.loggedInUser = state.users[0];
    },
    // takes User object
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    // takes User's username
    findUserByName: (state, action: PayloadAction<string>) => {
      state.foundUserByName =
        state.users.find((user) => user.username === action.payload) || null;
    },
    // takes User's userId
    findUserById: (state, action: PayloadAction<string>) => {
      state.foundUserByName =
        state.users.find((user) => user.userId === action.payload) || null;
    },
    // takes User's userId
    deleteUser: (state, action: PayloadAction<string>) => {
      if (state.foundUserById?.userId === action.payload) {
        state.foundUserById = null;
        state.foundUserByName = null;
      }
      state.users = state.users.filter(
        (user) => user.userId !== action.payload
      );
    },
    // takes User's userId and updated User's object
    updateUser: (
      state,
      action: PayloadAction<{ userId: string; userData: User }>
    ) => {
      const userIndex = state.users.findIndex(
        (user) => user.userId === action.payload.userId
      );

      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...action.payload.userData,
        };
      }
    },
  },
});

export const { createUser, findUserById, findUserByName, deleteUser } =
  usersSlice.actions;
export default usersSlice.reducer;
// export const usersFromState = (state: RootState) => state.users;
