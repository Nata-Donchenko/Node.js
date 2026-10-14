// Middleware that logs every API request as an analytics event in MongoDB after the response is sent

import { analyticsDb } from '../config/mongodb.js'
import { LOG_MESSAGES, ANALYTICS_EVENTS, ANALYTICS_COLLECTION, ROUTE_EVENT_MAP } from '../constants/index.js'

export const analyticsMiddleware = (req, res, next) => {
  const startTime = Date.now()
  
  res.on('finish', async () => {
    const routeKey = `${req.method} ${req.baseUrl}${req.route?.path}`
    const eventType = ROUTE_EVENT_MAP[routeKey] ?? ANALYTICS_EVENTS.UNKNOWN_REQUEST
    
    const event = {
      type: eventType,
      method: req.method,
      endpoint: req.originalUrl,
      timestamp: new Date(startTime),
      statusCode: res.statusCode,
      durationMs: Date.now() - startTime,
      details: res.locals.analytics ?? null,
    }
    
    try {
      await analyticsDb.collection(ANALYTICS_COLLECTION).insertOne(event)
    } catch (error) {
      console.error(LOG_MESSAGES.ANALYTICS_WRITE_FAILED, error.message)
    }
  })
  
  next()
};