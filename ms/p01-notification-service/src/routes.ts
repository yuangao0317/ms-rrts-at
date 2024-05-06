import express, { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router: Router = express.Router();

// All health routes are only for inter-network, will not bind to API Gateway
export function healthMonitoringRoutes(): Router {
    router.get('/notification-health', (_req: Request, res: Response) => {
        res.status(StatusCodes.OK).send('Notification service is healthy and OK.');
    });
    return router;
}