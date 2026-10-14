// Routes for product endpoints with authentication for write operations

import { Router } from 'express'

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import  {
  addAttribute,
  getAttributes
} from "../controllers/attributeController.js";
import { ROUTES } from '../constants/index.js';
import { authMiddleware, productOwnerMiddleware } from '../middleware/index.js';

const productRouter = Router()
productRouter.post(ROUTES.ROOT, authMiddleware, createProduct)
productRouter.get(ROUTES.ROOT, getAllProducts)
productRouter.get(ROUTES.BY_ID, getProductById)
productRouter.put(ROUTES.BY_ID, authMiddleware, productOwnerMiddleware, updateProduct)
productRouter.delete(ROUTES.BY_ID, authMiddleware, productOwnerMiddleware, deleteProduct)
productRouter.post(ROUTES.ATTRIBUTES, authMiddleware, productOwnerMiddleware, addAttribute)
productRouter.get(ROUTES.ATTRIBUTES, getAttributes)

export default productRouter;