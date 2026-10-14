// Sequelize model for the products table

import { DataTypes } from 'sequelize'
import {sequelize} from '../config/mysql.js'
import { TABLES} from '../constants/index.js';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: TABLES.PRODUCTS,
  underscored: true,
})