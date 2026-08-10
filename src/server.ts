import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRouter from "./routes/orderRoutes";

import {errorHandler} from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRouter)

app.use(errorHandler)

const startServer = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log(`Server started on port 3000`);
  })
}

void startServer()
