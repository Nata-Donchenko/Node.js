// Text messages used in logs and API responses

export const LOG_MESSAGES = {
  MYSQL_CONNECTED: 'MySQL connected',
  MYSQL_SYNCED: 'MySQL tables synchronized',
  
  MONGO_CONNECTED: 'MongoDB connected',
  
  SERVER_STARTED: 'Server is running on port',
  SERVER_START_FAILED: 'Failed to start server:',
  
  ANALYTICS_WRITE_FAILED: 'Failed to write analytics event:',
}

export const MESSAGES = {
  EMAIL_PASSWORD_REQUIRED: 'Email and password are required', //400
  NAME_PRICE_REQUIRED: 'Product name and price are required',
  ATTRIBUTE_NAME_VALUE_REQUIRED: 'Attribute name and value are required',
  
  INVALID_LOGIN: 'Invalid email or password', //401
  INVALID_TOKEN: 'Invalid token',
  TOKEN_REQUIRED: 'Authorization token is required',
  
  ONLY_OWNERS_CAN_CREATE: 'Only owners can create products', //403
  NOT_PRODUCT_OWNER: 'You can only modify your own products',
  
  USER_NOT_FOUND: 'User not found', //404
  PRODUCT_NOT_FOUND: 'Product not found',
  
  EMAIL_ALREADY_EXISTS: 'User with this email already exists', //409
  
}