import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class FollowController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: req.params.userId,
        followingId: req.body.followId,
      },
    });

    if (follow) {
      res.json(follow);
    } else {
      res.json(
        await this.prisma.follow.create({
          data: {
            followerId: req.body.followerId,
            followingId: req.params.userId,
          },
        })
      );
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const countDeleted = await this.prisma.follow.deleteMany({
      where: {
        followerId: req.body.followerId,
        followingId: req.params.userId,
      },
    });

    res.status(204);
  }

  async followersByUser(req: Request, res: Response, next: NextFunction) {}

  async followingByUser(req: Request, res: Response, next: NextFunction) {}
}

export default new FollowController();
