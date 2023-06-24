import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class FollowController extends BaseController {
  async followersByUser(req: Request, res: Response, next: NextFunction) {}

  async followingByUser(req: Request, res: Response, next: NextFunction) {}
}

export default new FollowController();
