import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class LikeController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const [userId, tweetId] = [
      BigInt(req.body.userId),
      BigInt(req.params.tweetId),
    ];

    const likeExists = await this.prisma.like.findFirst({
      where: { userId, tweetId },
    });

    if (likeExists) {
      return res.json(likeExists);
    }

    const newLike = await this.prisma.like.create({
      data: { userId, tweetId },
    });

    return res.json(newLike);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const [userId, tweetId] = [
      BigInt(req.body.userId),
      BigInt(req.params.tweetId),
    ];

    const countDeleted = await this.prisma.like.deleteMany({
      where: { userId, tweetId },
    });

    return res.status(204);
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

    const likes = await this.prisma.like.findMany({
      select: {
        tweet: true,
      },
      where: {
        userId: BigInt(req.params.userId),
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
      nextOffset: likes.length < limit ? null : offset + limit,
      records: likes.map((like) => like.tweet),
    });
  }

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

    const likes = await this.prisma.like.findMany({
      select: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        tweetId: BigInt(req.params.tweetId),
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? +req.query.offset : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: likes.length < limit ? null : offset + limit,
      records: likes.map((like) => like.user),
    });
  }
}

export default new LikeController();
