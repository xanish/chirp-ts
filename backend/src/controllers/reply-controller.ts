import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class ReplyController extends BaseController {
  async findByUser(req: Request, res: Response, next: NextFunction) {}

  async findByTweet(req: Request, res: Response, next: NextFunction) {}
}

export default new ReplyController();
