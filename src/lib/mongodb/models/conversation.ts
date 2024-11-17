import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
  name: string;
  isGroup: boolean;
  lastMessageId?: string;
}

const ConversationSchema: Schema<IConversation> =
  new mongoose.Schema<IConversation>({
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
      type: String,
      required: false,
      unique: true,
    },
  });

const ConversationModel: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);

export default ConversationModel;
