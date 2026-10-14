// Controller for user registration, login and profile

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/index.js'
import {MESSAGES, HTTP_STATUS, LOGIN_FAILURE_REASONS} from '../constants/index.js'

export const registerUser = async (req, res) => {
  const { email, password, isOwner = false } = req.body ?? {}
  
  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: MESSAGES.EMAIL_PASSWORD_REQUIRED })
  }
  
  const registeredUser = await User.findOne({ where: { email }})
  
  if (registeredUser) {
    return res.status(HTTP_STATUS.CONFLICT).json({ message: MESSAGES.EMAIL_ALREADY_EXISTS})
  }
  
  const saltRounds = +process.env.BCRYPT_SALT_ROUNDS
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const newUser = await User.create({ email, passwordHash, isOwner: Boolean(isOwner)})
  
  res.locals.analytics = { email: newUser.email, isOwner: newUser.isOwner, success: true }
  return res.status(HTTP_STATUS.CREATED).json({
    id: newUser.id,
    email: newUser.email,
    isOwner: newUser.isOwner
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body ?? {}
  
  const client = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }
  
  if (!email || !password) {
    res.locals.analytics = { email, success: false, failureReason: LOGIN_FAILURE_REASONS.MISSING_FIELDS, client }
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: MESSAGES.EMAIL_PASSWORD_REQUIRED })
  }
  
  const user = await User.findOne({ where: { email } })
  
  if (!user) {
    res.locals.analytics = { email, success: false, failureReason: LOGIN_FAILURE_REASONS.USER_NOT_FOUND, client }
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.INVALID_LOGIN})
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  
  if (!isPasswordValid) {
    res.locals.analytics = { email, success: false, failureReason: LOGIN_FAILURE_REASONS.WRONG_PASSWORD, client }
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.INVALID_LOGIN })
  }
  
  const token = jwt.sign({ id: user.id, isOwner: user.isOwner }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  
  res.locals.analytics = { email, success: true, userId: user.id, client };
  return res.status(HTTP_STATUS.OK).json({ token })
}

export const getUserProfile = async (req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id, { attributes: { exclude: ['passwordHash'] }})
  
  if (!user) {
    res.locals.analytics = { viewedUserId: id, found: false }
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.USER_NOT_FOUND })
  }
  
  res.locals.analytics = { viewedUserId: id, found: true }
  return res.status(HTTP_STATUS.OK).json({ user })
}
