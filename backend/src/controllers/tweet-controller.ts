import { NextFunction, Request, Response } from 'express';
import { AttachmentType, TweetType } from '@prisma/client';
import mime from 'mime-types';

import BaseController from './base-controller.js';

class TweetController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const attachments = (req.body.attachments || []).map(
      (attachment: string) => {
        return {
          id: this.snowflakeId(),
          type: (mime.lookup(attachment) || '').includes('video')
            ? AttachmentType.VIDEO
            : AttachmentType.IMAGE,
          content: attachment,
        };
      }
    );

    const tweet = {
      id: this.snowflakeId(),
      userId: BigInt(req.body.userId).valueOf(),
      content: req.body.content,
      type: req.body.type ?? undefined,
      relatedId: req.body.relatedId
        ? BigInt(req.body.relatedId).valueOf()
        : undefined,
      attachments: attachments ? { create: attachments } : undefined,
    };

    return res.json(await this.prisma.tweet.create({ data: tweet }));
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = BigInt(req.params.tweetId).valueOf();

    const countDeleted = await this.prisma.tweet.delete({ where: { id } });

    return res.status(204).send();
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ?? undefined;
    const limit = +(req.query.limit || 10);

    const tweets = await this.prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        type: true,
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
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
        _count: {
          select: {
            likes: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId: BigInt(req.params.userId).valueOf(),
        NOT: {
          type: TweetType.REPLY,
        },
      },
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: BigInt(offset.toString()).valueOf() } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // if not tweets then return next offset as null to indicate end of results
    const lastTweetId = tweets.length ? tweets[tweets.length - 1].id : null;

    return res.json({
      currentOffset: offset ?? null,
      currentLimit: limit,
      nextOffset: lastTweetId,
      records: tweets,
    });
  }
}

export default new TweetController();
