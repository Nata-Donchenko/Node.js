interface EmailPayload {
  channel: Extract<Channel, 'email'>
  to: string
  subject: string
  body: string
  attachments?: string[]
  priority: 'low' | 'normal' | 'high'
}

interface SmsPayload {
  channel: Extract<Channel, 'sms'>
  to: string
  text: string
  priority: 'low' | 'normal' | 'high'
}

interface PushPayload {
  channel: Extract<Channel, 'push'>
  deviceToken: string
  title: string
  body: string
  badge?: number
  priority: 'low' | 'normal' | 'high'
}

interface TelegramPayload {
  channel: Extract<Channel, 'telegram'>
  chatId: string
  text: string
  priority: 'low' | 'normal' | 'high'
}

export type NotificationPayload = EmailPayload | SmsPayload | PushPayload | TelegramPayload

//type NotificationPayload = EmailPayload | SmsPayload | PushPayload | TelegramPayload error TS2322: Type 'TelegramPayload' is not assignable to type 'never'.

export function describe(payload: NotificationPayload): string {
  switch (payload.channel) {
    case 'email':
      return `${payload.subject}, ${payload.body}, ${payload.attachments}`
    case 'sms':
      return `${payload.text}`
      //return `${payload.subject}` error TS2339: Property 'subject' does not exist on type 'SmsPayload'.
    case 'push':
      return `${payload.deviceToken}, ${payload.title}, ${payload.body}, ${payload.badge}`
    case 'telegram':
      return `${payload.text}, ${payload.chatId}`
    default:  {
      const exhaustive: never = payload
      throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`)
    }
  }
}

const CHANNELS = ["email", "sms", "push", "telegram"] as const;
type Channel = (typeof CHANNELS)[number];
