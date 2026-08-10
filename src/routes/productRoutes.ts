import express from "express";

import {getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct} from "../controllers/productController";
import {roleMiddleware} from "../middlewares/roleMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getOneProduct);

productRouter.post("/", authMiddleware, roleMiddleware('admin'), createProduct);

productRouter.put("/:id", authMiddleware, roleMiddleware('admin'), updateProduct);

productRouter.delete("/:id", authMiddleware, roleMiddleware('admin'), deleteProduct);


export default productRouter;