// Application entry point: loads env, connects databases, starts the server

import 'dotenv/config'
import express from 'express'

import { sequelize, connectMySQL } from './config/mysql.js';
import { connectMongo } from './config/mongodb.js'

import {analyticsMiddleware, authMiddleware} from './middleware/index.js'
import userRouter from './routes/userRoutes.js'
import productRouter from "./routes/productRoutes.js";
import './models/index.js'

import { LOG_MESSAGES, ROUTES } from './constants/index.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use(analyticsMiddleware)

app.use(ROUTES.USERS, userRouter)
app.use(ROUTES.PRODUCTS, productRouter)

const startServer = async () => {
  try {
    await connectMongo()
    await connectMySQL()
    await sequelize.sync()
    console.log(LOG_MESSAGES.MYSQL_SYNCED)
    
    app.listen(PORT, () => {
      console.log(`${LOG_MESSAGES.SERVER_STARTED} ${PORT}`)
    })
  } catch (error) {
    console.error(LOG_MESSAGES.SERVER_START_FAILED, error.message)
    process.exit(1)
  }
}

void startServer()