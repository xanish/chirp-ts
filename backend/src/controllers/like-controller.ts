import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class LikeController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const like = await this.prisma.like.findFirst({
      where: {
        userId: req.body.userId,
        tweetId: req.params.tweetId,
      },
    });

    if (like) {
      res.json(like);
    } else {
      res.json(
        await this.prisma.like.create({
          data: {
            userId: req.body.userId,
            tweetId: req.params.tweetId,
          },
        })
      );
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const countDeleted = await this.prisma.like.deleteMany({
      where: {
        userId: req.body.userId,
        tweetId: req.params.tweetId,
      },
    });

    res.status(204);
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ? +req.query.offset : 0;
    const limit = +(req.query.limit || 10);

    const likes = await this.prisma.like.findMany({
      select: {
        tweet: true,
      },
      where: {
        userId: req.params.userId,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: likes.length < limit ? null : offset + limit,
      records: likes.map((like) => like.tweet),
    });
  }

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ? +req.query.offset : 0;
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
        tweetId: req.params.tweetId,
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? +req.query.offset : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: likes.length < limit ? null : offset + limit,
      records: likes.map((like) => like.user),
    });
  }
}

export default new LikeController();
