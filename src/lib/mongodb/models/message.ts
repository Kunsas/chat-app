import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
  type: string;
  content?: string[];
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema<IMessage>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "SenderId is required"],
    unique: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "ChatId is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  content: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "CreatedAt is required"],
  },
});

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default MessageModel;
