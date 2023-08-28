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
      userId: req.body.userId,
      content: req.body.content,
      type: req.body.type ?? undefined,
      relatedId: req.body.relatedId ?? undefined,
      attachments: attachments ? { create: attachments } : undefined,
    };

    return res.json(await this.prisma.tweet.create({ data: tweet }));
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.tweetId;

    const countDeleted = await this.prisma.tweet.delete({ where: { id } });

    return res.status(204);
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ?? undefined;
    const limit = +(req.query.limit || 10);

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
        userId: +req.params.userId,
        NOT: {
          type: TweetType.REPLY,
        },
      },
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: BigInt(offset.toString()) } : undefined,
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
