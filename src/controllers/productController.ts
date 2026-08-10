import { Response, Request, NextFunction } from "express";

import Product from "../models/productModel";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const category = req.query.category as string | undefined;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).skip(skip).limit(limit);
    const totalCount = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      products,
      totalCount,
      currentPage: page,
      totalPages,
    });

  } catch (err) {
    next(err);
  }
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId)

    if(!product) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json({product})

  } catch (err) {
     next(err);
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product(req.body);
    await product.save();

    return res.status(201).json(product);

  } catch (err) {
    next(err);
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})

    if(!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json(updatedProduct);

  } catch (err) {
    next(err);
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json(deletedProduct);

  } catch (err) {
    next(err);
  }
}