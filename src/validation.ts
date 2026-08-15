import {describe, NotificationPayload} from "./payload";

function isNotificationPayload(value: unknown): value is NotificationPayload {

  if (typeof value !== 'object' || value === null) {
    return false
  }

  if(!('channel' in value)) {
    return false
  }

  if (typeof value.channel !== 'string') {
    return false
  }

  if (!['email', 'sms', 'push'].includes(value.channel)) {
    return false
  }

  if (value.channel === 'email') {
    return 'to' in value && typeof value.to === 'string' &&
           'subject' in value && typeof value.subject === 'string' &&
           'body' in value && typeof value.body === 'string'
  }

  if (value.channel === 'sms') {
    return 'to' in value && typeof value.to === 'string' &&
           'text' in value && typeof value.text === 'string'
  }

  if (value.channel === 'push') {
    return 'deviceToken' in value && typeof value.deviceToken === 'string' &&
           'title' in value && typeof value.title === 'string' &&
           'body' in value && typeof value.body === 'string'
  }

  return false
}

export function handleIncoming(raw: unknown) {
  if(isNotificationPayload(raw)) {
    describe(raw)
  } else {
    console.log('Invalid notification payload received');
  }
}

console.log(isNotificationPayload({ channel: "sms", to: "+380...", text: "hi", priority: "low" }));

