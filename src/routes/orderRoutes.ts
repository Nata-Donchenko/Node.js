import express from "express";

import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController'
import {roleMiddleware} from "../middlewares/roleMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";

const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, getOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);

orderRouter.post("/", authMiddleware, createOrder);

orderRouter.patch("/:id/status", authMiddleware, roleMiddleware('admin'), updateOrderStatus);

export default orderRouter;