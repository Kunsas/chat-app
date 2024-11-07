import { v4 as uuidv4 } from "uuid";
import { User } from "./model/user";

export const users: User[] = [
  {
    id: uuidv4(),
    username: "Ali",
    image: "user_1.png",
    email: "ali@sample.com",
  },
  {
    id: uuidv4(),
    username: "Alicent",
    image: "2.png",
    email: "alicent@sample.com",
  },
  {
    id: uuidv4(),
    username: "Millie",
    image: "user_3.png",
    email: "millie@sample.com",
  },
  {
    id: uuidv4(),
    username: "Bob",
    image: "user_4.png",
    email: "bob@sample.com",
  },
];
