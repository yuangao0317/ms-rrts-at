import { config } from '@notifications/config';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Logger } from 'winston';
import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from '@notifications/queues/message-broker';
import { sendEmail } from '@notifications/queues/mail.transport';
import { IEmailLocals } from '@notifications/email.interfaces';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'ms-auth-notification-email-exchange';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const assertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);
    channel.consume(assertQueue.queue, async (msg: ConsumeMessage | null) => {
      const { receiverEmail, username, verifyLink, resetLink, template, otp } = JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/JK4Q2Yv/logo-gold.png',
        username,
        verifyLink,
        resetLink,
        otp
      };
      await sendEmail(template, receiverEmail, locals);
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}

export { consumeAuthEmailMessages };
