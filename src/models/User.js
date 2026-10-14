// Sequelize model for the users table

import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

import { TABLES } from '../constants/index.js';
import { DEFAULT_SETTINGS } from "../constants/index.js";

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  language: {
    type: DataTypes.STRING(10),
    defaultValue: DEFAULT_SETTINGS.LANGUAGE,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: DEFAULT_SETTINGS.CURRENCY,
    allowNull: false,
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {},
  }
}, {
  tableName: TABLES.USERS,
  underscored: true,
  updatedAt: false,
})