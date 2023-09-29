import { NextFunction, Request, Response } from 'express';
import BaseController from './base.controller.js';

class LikeController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const [userId, tweetId] = [
      BigInt(req.body.userId).valueOf(),
      BigInt(req.params.tweetId).valueOf(),
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
      BigInt(req.body.userId).valueOf(),
      BigInt(req.params.tweetId).valueOf(),
    ];

    const countDeleted = await this.prisma.like.deleteMany({
      where: { userId, tweetId },
    });

    return res.status(204).send();
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

    const likes = await this.prisma.like.findMany({
      select: {
        tweet: {
          select: {
            id: true,
            type: true,
            content: true,
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
            attachments: {
              select: {
                id: true,
                type: true,
                content: true,
              },
            },
            related: {
              select: {
                id: true,
                type: true,
                content: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                  },
                },
                createdAt: true,
                updatedAt: true,
              },
            },
            likes: {
              select: {
                createdAt: true,
              },
              where: {
                userId: loggedInUserId,
              },
            },
            _count: {
              select: {
                likes: true,
                replies: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        userId: BigInt(req.params.userId).valueOf(),
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
      nextOffset: likes.length < limit ? offset + likes.length : offset + limit,
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
      nextOffset: likes.length < limit ? offset + likes.length : offset + limit,
      records: likes.map((like) => like.user),
    });
  }
}

export default new LikeController();
