import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFriend extends Document {
  userId: mongoose.Types.ObjectId;
  friendId: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
}

const FriendSchema: Schema<IFriend> = new mongoose.Schema<IFriend>({
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "FriendId is required"],
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
    unique: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "ChatId is required"],
    unique: true,
  },
});

const FriendModel: Model<IFriend> =
  mongoose.models.Friend || mongoose.model("Friend", FriendSchema);

export default FriendModel;
