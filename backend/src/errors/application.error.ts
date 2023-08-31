import { Request, Response } from 'express';
import Logger from '../bootstrap/logging.js';

export abstract class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  get name() {
    return this.constructor.name;
  }

  render(req: Request, res: Response) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      error: this.name,
      message: this.message,
    });
  }

  report(req: Request) {
    Logger.error(this.message, {
      request: {
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      },
      trace: this.stack,
    });
  }
}
