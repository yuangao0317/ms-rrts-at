import { config } from '@auth/config';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@auth/queues/message-broker';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authServiceProducer', 'debug');

export async function publishDirectMessage(
  channel: Channel,
  exhangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exhangeName, 'direct');
    channel.publish(exhangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'AuthService Provider publishDirectMessage() method error:', error);
  }
}
