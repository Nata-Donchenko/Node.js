// Sequelize model for the product attribute

import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import { TABLES } from '../constants/index.js';

export const ProductAttribute = sequelize.define('ProductAttribute', {
  attributeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attributeName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  attributeValue: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: TABLES.ATTRIBUTES,
  underscored: true,
  timestamps: false,
})