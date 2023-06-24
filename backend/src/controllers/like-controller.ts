import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class LikeController extends BaseController {
  async findByUser(req: Request, res: Response, next: NextFunction) {}
}

export default new LikeController();
