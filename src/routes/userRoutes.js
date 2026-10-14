// Routes for user endpoints: registration, login and profile

import { Router } from 'express'

import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js'
import { ROUTES } from '../constants/index.js';

const userRouter = Router()
userRouter.post(ROUTES.REGISTER, registerUser)
userRouter.post(ROUTES.LOGIN, loginUser)
userRouter.get(ROUTES.BY_ID, getUserProfile)

export default userRouter;