export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
}

export const users: User[] = [
  {
    id: "1",
    username: "Ali",
    image: "user_1.png",
    email: "ali@sample.com",
  },
  {
    id: "2",
    username: "Alicent",
    image: "user_2.png",
    email: "alicent@sample.com",
  },
  {
    id: "3",
    username: "Millie",
    image: "user_3.png",
    email: "millie@sample.com",
  },
  {
    id: "4",
    username: "Bob",
    image: "user_4.png",
    email: "bob@sample.com",
  },
];


export const loggedInUser = users[0];