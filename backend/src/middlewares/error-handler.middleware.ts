import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../errors/application.error.js';
import Logger from '../bootstrap/logging.js';

class ErrorHandler {
  protected dontReport: Array<string> = [];

  handle(
    err: ApplicationError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof ApplicationError) {
      err.render(req, res);
      if (!this.dontReport.includes(err.name)) {
        err.report(req);
      }
    } else {
      this.render(err, req, res);
      this.report(err, req);
    }
  }

  handleUncaught(err: Error) {
    Logger.error('uncaught error', { message: err.message, trace: err.stack });

    // it is considered a good practice to exit the server on any uncaught errors
    // the process manager must make sure to restart the process after this
    process.exit(1);
  }

  handleUncaughtRejection(reason: any, promise: any, err: Error) {
    Logger.error('uncaught promise', {
      reason: reason,
      message: err.message,
      trace: err.stack,
      promise: promise,
    });

    // it is considered a good practice to exit the server on any uncaught errors
    // the process manager must make sure to restart the process after this
    process.exit(1);
  }

  protected render(err: Error, req: Request, res: Response) {
    return res.status(500).json({
      statusCode: 500,
      error: err.name || 'InternalServerError',
      message: err.message,
    });
  }

  protected report(err: Error, req: Request) {
    Logger.error(err.message, {
      request: {
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      },
      trace: err.stack,
    });
  }
}

export default new ErrorHandler();
