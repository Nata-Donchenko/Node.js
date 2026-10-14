// Middleware that loads the product by id, checks that the current user owns it and attaches it to req.product\

import { Product } from "../models/index.js"
import { MESSAGES, HTTP_STATUS } from '../constants/index.js'

export const productOwnerMiddleware = async (req, res, next) => {
  const { id: productId } = req.params
  const { id: userId } = req.user
  
  const product = await Product.findByPk(productId)
  
  if (!product) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND })
  }
  
  if (product.ownerId !== userId) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: MESSAGES.NOT_PRODUCT_OWNER })
  }
  
  req.product = product
  
  next()
}