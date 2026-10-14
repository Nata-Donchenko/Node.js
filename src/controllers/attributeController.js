// Controller for product attributes (EAV): add and list attributes of a product

import { ProductAttribute} from "../models/index.js";
import { Product } from "../models/index.js";
import { MESSAGES, HTTP_STATUS } from '../constants/index.js'

export const addAttribute = async (req, res) => {
  const { id: productId } = req.product
  const { name: attributeName, value: attributeValue } = req.body ?? {}
  
  if (!attributeName || !attributeValue) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: MESSAGES.ATTRIBUTE_NAME_VALUE_REQUIRED })
  }
  
  const newAttribute = await ProductAttribute.create({ attributeName, attributeValue, productId })
  
  res.locals.analytics = {
    productId,
    attribute: { name: attributeName, value: attributeValue },
  };
  return res.status(HTTP_STATUS.CREATED).json({attribute: newAttribute })
}

export const getAttributes = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findByPk(productId)
  
  if (!product) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND })
  }
  const attributes = await ProductAttribute.findAll({ where: { productId }})
  
  res.locals.analytics = { productId, count: attributes.length };
  return res.status(HTTP_STATUS.OK).json({ attributes })
}

