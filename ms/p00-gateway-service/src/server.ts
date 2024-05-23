import http from 'http';

import { Logger } from 'winston';
import { winstonLogger, CustomError, IErrorResponse } from '@yuangao0317/ms-rrts-at-shared-common';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { config } from '@gateway/config';
import { appRoutes } from '@gateway/routes';
import { elasticsearch } from '@gateway/elasticsearch';
import { axiosAuthInstance } from '@gateway/services/api/auth.service';
import { AxiosError } from 'axios';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gatewayServer', 'debug');

export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.setSecurityMiddleware(this.app);
    this.setStandardMiddleware(this.app);
    // ensure that middleware that modifies the response headers is placed before middleware that sends the response.
    this.routesMiddleware(this.app);
    this.startElasticSearch();
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
        credentials: true, // attach session cookies with JWT to all requets coming from Client
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );

    // attach JWT to header, and pass to internal services like authService
    app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.session?.jwt) {
        axiosAuthInstance.defaults.headers['Authorization'] = `Bearer ${req.session?.jwt}`;
      }
      next();
    });
  }

  private setStandardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' })); // when we send data through the body with a Post request, we can get it via request.body
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private setErrorHandlerMiddleware(app: Application): void {
    // url doe not exist
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
      next();
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
      if (error instanceof CustomError) {
        // error from throw
        log.log('error', `GatewayService CustomError: ${error.comingFrom}:`, error);
        res.status(error.statusCode).json(error.serializeErrors());
      } else if (error instanceof AxiosError) {
        log.log('error', `GatewayService AxiosError: ${error.response?.data.message}:`, error.response);
        res.status(error.response?.status as number).json({ status: 'error', message: `Gateway Error: ${error.response?.data.message}` });
      } else {
        log.log('error', `GatewayService Error: ${error.message}:`, error);
        res.status(500).json({
          status: 'error',
          message: 'Something went very wrong in Gateway Service!'
        });
      }
      // next();
    });
  }

  private startElasticSearch(): void {
    elasticsearch.checkConnection();
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
