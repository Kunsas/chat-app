import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChat extends Document {
  name: string;
  isGroup: boolean;
  lastMessageId?: mongoose.Types.ObjectId;
}

const ChatSchema: Schema<IChat> = new mongoose.Schema<IChat>({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    maxLength: [80, "Please use a shorter name"],
    minLength: [1, "Please use a longer name"],
    trim: true,
  },

  isGroup: {
    type: Boolean,
    required: [true, "IsGroup is required"],
  },
  lastMessageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null,
  },
});

const ChatModel: Model<IChat> =
  mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default ChatModel;
