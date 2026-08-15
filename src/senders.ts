import type {NotificationPayload} from "./payload";

type SendResult =
  | { ok: true; messageId: string; sentAt: Date }
  | { ok: false; error: string; retryable: boolean };

interface Sender {
  (arg: NotificationPayload): Promise<SendResult>;
  channel: 'email' | 'sms' | 'push'
  isAvailable(): boolean
}

interface SendLogger {
  (arg: SendResult): void;
}

const emailSender = async (payload: NotificationPayload): Promise<SendResult> => {
  console.log('email sent')
  return {ok: true, messageId: 'm1', sentAt: new Date()}
}

emailSender.channel = 'email' as const
emailSender.isAvailable = () => true

const smsSender = async (payload: NotificationPayload): Promise<SendResult> => {
  console.log('sms sent')
  return {ok: true, messageId: 'm2', sentAt: new Date()}
}

smsSender.channel = 'sms' as const
smsSender.isAvailable = () => true

const pushSender = async (payload: NotificationPayload): Promise<SendResult> => {
  console.log('push sent')
  return {ok: true, messageId: 'm3', sentAt: new Date()}
}

pushSender.channel = 'push' as const
pushSender.isAvailable = () => true

async function sendWithLogging(payload: NotificationPayload, sender:Sender, logger: SendLogger) {
  const result = await sender(payload)
  logger(result)
}

const consoleLogger: SendLogger = (result) => {
  if (result.ok) {
    console.log(result.messageId, result.sentAt)
  } else {
    console.log(result.error, result.retryable)
  }
}

const testPayload: NotificationPayload = {
  channel: 'email',
  to: 'user@example.com',
  subject: 'Test',
  body: 'Hello!',
  priority: 'normal',
};

sendWithLogging(testPayload, emailSender, consoleLogger);