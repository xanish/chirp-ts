import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class FollowController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [req.body.followerId, req.params.userId];

    const followExists = await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    if (followExists) {
      return res.json(followExists);
    }

    const newFollow = await this.prisma.follow.create({
      data: { followerId, followingId },
    });

    return res.json(newFollow);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [req.body.followerId, req.params.userId];

    const countDeleted = await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });

    return res.status(204);
  }

  async followersByUser(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ? +req.query.offset : 0;
    const limit = +(req.query.limit || 10);

    const follows = await this.prisma.follow.findMany({
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        followingId: req.params.userId,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: follows.length < limit ? null : offset + limit,
      records: follows.map((follow) => follow.follower),
    });
  }

  async followingByUser(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ? +req.query.offset : 0;
    const limit = +(req.query.limit || 10);

    const follows = await this.prisma.follow.findMany({
      select: {
        following: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        followerId: req.params.userId,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: follows.length < limit ? null : offset + limit,
      records: follows.map((follow) => follow.following),
    });
  }
}

export default new FollowController();
