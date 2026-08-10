import express from "express";

import {login, register, getMe, refresh, logout} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);

export default router;