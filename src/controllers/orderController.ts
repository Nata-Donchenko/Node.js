import { Request, Response, NextFunction } from "express";

import Order from '../models/orderModel'
import Product from '../models/productModel'

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items } = req.body;
    const userId = req.user?.id

    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId)

      if (!product) {
        return res.status(404).send('Product not found');
      }

      if (product.stock < item.quantity) {
        return res.status(400).send(`Not enough stock for ${product.title}`);
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });

      total += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save()

    }

    const order =  new Order({
      user: userId,
      items: orderItems,
      total: total,
    })

    await order.save();
    return res.status(201).send(order)

  } catch (err) {
    next(err)
  }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.user) {
      return res.status(401).send('Not authorized');
    }

    const { id, role } = req.user;
    const filter = role === 'admin' ? {} : {user: id}
    const usersOrder = await Order.find(filter)

    return res.status(200).json(usersOrder)

  } catch (err) {
    next(err)
  }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send('Not authorized');
    }

    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
      return res.status(403).send('Forbidden');
    }

    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;

    const updateOrder = await Order.findByIdAndUpdate(orderId, { status }, {new: true})

    if (!updateOrder) {
      return res.status(404).send('Not found order');
    }

    return res.status(200).send(updateOrder);

  } catch (err) {
    next(err);
  }
}

