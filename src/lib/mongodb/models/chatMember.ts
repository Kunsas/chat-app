import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChatMember extends Document {
  memberId: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
  lastSeenMessageId?: mongoose.Types.ObjectId;
}

const ChatMemberSchema: Schema<IChatMember> = new mongoose.Schema<IChatMember>({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "MemberId is required"],
    unique: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "ChatId is required"],
    unique: true,
  },
  lastSeenMessageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null,
    unique: true,
  },
});

const ChatMemberModel: Model<IChatMember> =
  mongoose.models.ChatMember || mongoose.model("ChatMember", ChatMemberSchema);

export default ChatMemberModel;
