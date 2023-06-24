import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class TweetController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {}

  async create(req: Request, res: Response, next: NextFunction) {}

  async delete(req: Request, res: Response, next: NextFunction) {}

  async findByUser(req: Request, res: Response, next: NextFunction) {}
}

export default new TweetController();
