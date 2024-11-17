import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFriend extends Document {
  friendId: string;
  userId: string;
  conversationId: string;
}

const FriendSchema: Schema<IFriend> = new mongoose.Schema<IFriend>({
  friendId: {
    type: String,
    required: [true, "FriendId is required"],
    unique: true,
  },
  userId: {
    type: String,
    required: [true, "UserId is required"],
    unique: true,
  },
  conversationId: {
    type: String,
    required: [true, "ConversationId is required"],
    unique: true,
  },
});

const FriendModel: Model<IFriend> =
  mongoose.models.Friend || mongoose.model("Friend", FriendSchema);

export default FriendModel;
