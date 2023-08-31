import { Request, Response } from 'express';
import { ApplicationError } from '../errors/application.error.js';

class ErrorHandler {
  protected dontReport: Array<string> = [];

  handle(err: ApplicationError | Error, req: Request, res: Response) {
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
    // todo: log error / report it
    process.exit(1);
  }

  protected render(err: Error, req: Request, res: Response) {
    return res.status(500).json({
      statusCode: 500,
      error: err.name || 'InternalServerError',
      message: err.message,
    });
  }

  protected report(err: Error, req: Request) {}
}

export default new ErrorHandler();
