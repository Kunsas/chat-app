import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  conversationId: string;
  type: string;
  content?: string[];
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema<IMessage>({
  senderId: {
    type: String,
    required: [true, "SenderId is required"],
    unique: true,
  },
  conversationId: {
    type: String,
    required: [true, "ConversationId is required"],
    unique: true,
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
    required: [true, "CreatedAt is required"],
  },
});

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default MessageModel;
