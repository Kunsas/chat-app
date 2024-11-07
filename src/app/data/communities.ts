import { v4 as uuidv4 } from "uuid";

export interface Community {
  id: string;
  name: string;
  image: string;
}

export const communities: Community[] = [
  {
    id: uuidv4(),
    name: "Alpha",
    image: "comm_1.png",
  },
  {
    id: uuidv4(),
    name: "Beta",
    image: "comm_2.png",
  },
  {
    id: uuidv4(),
    name: "Gamma",
    image: "comm_3.png",
  },
  {
    id: uuidv4(),
    name: "Delta",
    image: "comm_4.png",
  },
];
