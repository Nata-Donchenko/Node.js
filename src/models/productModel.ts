import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.model<IProduct>("Product", ProductSchema);