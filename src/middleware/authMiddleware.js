// Middleware that verifies JWT from the Authorization header and attaches the user payload to req.user

import jwt from 'jsonwebtoken'

import { AUTH, MESSAGES, HTTP_STATUS } from '../constants/index.js'

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.TOKEN_REQUIRED })
  }
  
  const [scheme, token] = authorization.split(' ')
  
  if (scheme !== AUTH.BEARER || !token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.TOKEN_REQUIRED })
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
  } catch (err) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.INVALID_TOKEN })
  }
  
  next()
}

