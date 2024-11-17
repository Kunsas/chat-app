import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversationMember extends Document {
  memberId: string;
  conversationId: string;
  lastSeenMessageId?: string;
}

const ConversationMemberSchema: Schema<IConversationMember> =
  new mongoose.Schema<IConversationMember>({
    memberId: {
      type: String,
      required: [true, "MemberId is required"],
      unique: true,
    },
    conversationId: {
      type: String,
      required: [true, "ConversationId is required"],
      unique: true,
    },
    lastSeenMessageId: {
      type: String,
      required: false,
      unique: true,
    },
  });

const ConversationMemberModel: Model<IConversationMember> =
  mongoose.models.ConversationMember ||
  mongoose.model("ConversationMember", ConversationMemberSchema);

export default ConversationMemberModel;
