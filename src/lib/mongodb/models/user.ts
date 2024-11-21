import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  imageUrl: string;
  email: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    maxLength: [80, "Please use a shorter name"],
    minLength: [1, "Please use a longer name"],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, "User image is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
});

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
