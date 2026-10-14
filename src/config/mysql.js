// MySQL connection setup via Sequelize ORM

import { Sequelize } from "sequelize";
import { LOG_MESSAGES} from "../constants/messages.js";

export const sequelize = new Sequelize(process.env.MYSQL_URL, {
  logging: false,
  dialectOptions: { decimalNumbers: true },
})

export const connectMySQL = async () => {
  await sequelize.authenticate()
  console.log(LOG_MESSAGES.MYSQL_CONNECTED)
}