import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IRefreshToken extends Document {
  token: string;
  user: mongoose.Types.ObjectId;
  expiresAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  }
})

export default mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);