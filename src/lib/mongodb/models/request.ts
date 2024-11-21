import mongoose, { Schema, Document, Model } from "mongoose";

interface IRequest extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
}

const RequestSchema: Schema<IRequest> = new Schema<IRequest>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Request: Model<IRequest> =
  mongoose.models.Request || mongoose.model<IRequest>("Request", RequestSchema);

export default Request;
