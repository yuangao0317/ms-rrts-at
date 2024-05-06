import { StatusCodes } from 'http-status-codes';

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}
export abstract class CustomError extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly status: string;
  public readonly comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
