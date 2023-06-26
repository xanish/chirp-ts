import { NextFunction, Request, Response } from 'express';
import { Prisma, TweetType } from '@prisma/client';

import BaseController from './base-controller.js';

class TweetController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const tweet: Prisma.TweetCreateInput = req.body;

    res.json(await this.prisma.tweet.create({ data: tweet }));
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    res.json(
      await this.prisma.tweet.delete({
        where: { id: req.params.tweetId },
      })
    );
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const tweets = await this.prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        type: true,
        related: {
          select: {
            id: true,
            content: true,
            type: true,
            relatedId: true,
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
        attachments: {
          select: {
            type: true,
            content: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId: req.params.userId,
        NOT: {
          type: TweetType.REPLY,
        },
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? 1 : undefined,
      cursor: req.query.offset ? { id: req.query.offset + '' } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // if not tweets then return next offset as null to indicate end of results
    const lastTweetId = tweets.length ? tweets[tweets.length - 1].id : null;

    res.json({
      currentOffset: req.query.offset ?? null,
      currentLimit: req.query.limit ?? 10,
      nextOffset: lastTweetId,
      records: tweets,
    });
  }
}

export default new TweetController();
