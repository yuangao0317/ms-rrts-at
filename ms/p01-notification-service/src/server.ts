import 'express-async-errors';
import http from 'http';

import { Application } from 'express';
import { Logger } from 'winston';
import { config } from '@notifications/config';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { healthMonitoringRoutes } from '@notifications/routes';
import { checkConnection } from '@notifications/elasticsearch';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startHttpServer(app);
  app.use('', healthMonitoringRoutes());
  startElasticSearch();
}

function startHttpServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on Notification Server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification Server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method:', error);
  }
}

function startElasticSearch(): void {
  checkConnection();
}
