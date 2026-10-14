// Controller for product CRUD operations

import { Product } from '../models/index.js'
import { MESSAGES, HTTP_STATUS } from '../constants/index.js'

export const createProduct = async (req, res) => {
  const { isOwner, id } = req.user
  
  if (!isOwner) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: MESSAGES.ONLY_OWNERS_CAN_CREATE })
  }
  
  const { name, price, description } = req.body ?? {}
  
  if (!name || !price) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: MESSAGES.NAME_PRICE_REQUIRED })
  }
  
  const newProduct = await Product.create({ name, price, description, ownerId: id })
  
  res.locals.analytics = {
    productId: newProduct.id,
    ownerId: newProduct.ownerId,
    product: { name: newProduct.name, price: newProduct.price },
  };
  
  return res.status(HTTP_STATUS.CREATED).json({ product: newProduct })
}

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll()
  
  res.locals.analytics = { count: products.length }
  return res.status(HTTP_STATUS.OK).json({ products })
}

export const getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findByPk(id)
  
  if (!product) {
    res.locals.analytics = { productId: id, found: false }
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND })
  }
  
  res.locals.analytics = { productId: id, found: true }
  return res.status(HTTP_STATUS.OK).json({ product })
}

export const updateProduct = async (req, res) => {
  const { product } = req
  const { name, price, description } = req.body ?? {}
  
  await product.update({ name, price, description })
  
  res.locals.analytics = {
    productId: product.id,
    ownerId: product.ownerId,
    changedFields: Object.entries({ name, price, description })
      .filter(([, value]) => value !== undefined)
      .map(([key]) => key),
  }
  
  return res.status(HTTP_STATUS.OK).json({ product })
}

export const deleteProduct = async (req, res) => {
  const { product } = req
  
  res.locals.analytics = { productId: product.id, ownerId: product.ownerId };
  
  await product.destroy()
  
  return res.status(HTTP_STATUS.NO_CONTENT).send()
}

