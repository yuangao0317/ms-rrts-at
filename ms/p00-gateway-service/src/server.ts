import http from 'http';

import { Logger } from 'winston';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { CustomError, IErrorResponse } from '@gateway/interfaces';
import { config } from '@gateway/config';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.setSecurityMiddleware(this.app);
    this.setStandardMiddleware(this.app);
    this.setErrorHandlerMiddleware(this.app);

    this.startServer(this.app);
  }

  private setSecurityMiddleware(app: Application): void {
    /* 
    By setting trust proxy to 1, Express will trust the client's IP address if it's passed in the X-Forwarded-For header from a single hop proxy. 
    This is useful for handling requests correctly when your Express application is deployed behind a reverse proxy.
    */
    app.set('trust proxy', 1);

    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
        // sameSite: 'none'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true, // attach jwt token to all requets coming from Client
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private setStandardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' })); // when we send data through the body with a Post request, we can get it via request.body
  }

  private setErrorHandlerMiddleware(app: Application): void {
    // url doe not exist
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
      next();
    });

    // error occurs
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        log.log('error', `GatewayService ${error.comingFrom}:`, error);
        res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);

      this.startHttpServer(httpServer);
    } catch (error) {
      log.log('error', 'GatewayService startServer() error method:', error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      log.info(`Worker with process id of ${process.pid} on Gateway Server has started`);
      httpServer.listen(SERVER_PORT, () => {
        log.info(`Gateway Server is running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      log.log('error', 'GatewayService startHttpServer() error method:', error);
    }
  }
}
