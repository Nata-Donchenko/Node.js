// MongoDB connection setup via the official MongoDB driver (analytics storage)

import { MongoClient } from 'mongodb'
import { LOG_MESSAGES } from '../constants/messages.js'

export const mongoClient = new MongoClient(process.env.MONGODB_URL)

export const analyticsDb = mongoClient.db()

export const connectMongo = async () => {
  await mongoClient.connect()
  console.log(LOG_MESSAGES.MONGO_CONNECTED)
}
