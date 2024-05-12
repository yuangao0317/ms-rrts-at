import 'express-async-errors';
import http from 'http';

import { Application } from 'express';
import { Logger } from 'winston';
import { config } from '@notifications/config';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { healthMonitoringRoutes } from '@notifications/routes';
import { checkConnection } from '@notifications/elasticsearch';
import { Channel } from 'amqplib';
import { createConnection } from '@notifications/queues/message-broker';
import { consumeAuthEmailMessages } from '@notifications/queues/email.consumer';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

// for publish messages
export let emailChannel: Channel;

export function start(app: Application): void {
  startHttpServer(app);
  app.use('', healthMonitoringRoutes());
  startMessageQueues();
  startElasticSearch();
}

function startHttpServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Notification Server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification Server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method:', error);
  }
}

async function startMessageQueues(): Promise<void> {
  emailChannel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);

  // test
  await emailChannel.assertExchange('ms-auth-notification-email-exchange', 'direct');
  const message = JSON.stringify({ name: 'test', service: 'notification service' });
  emailChannel.publish('ms-auth-notification-email-exchange', 'auth-email', Buffer.from(message));
}

function startElasticSearch(): void {
  checkConnection();
}
