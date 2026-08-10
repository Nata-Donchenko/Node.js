import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
})

export default mongoose.model<IUser>("User", UserSchema);