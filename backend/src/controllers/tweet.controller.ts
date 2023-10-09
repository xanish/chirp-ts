import mime from 'mime-types';
import { NextFunction, Request, Response } from 'express';
import { AttachmentType, TweetType } from '@prisma/client';
import BaseController from './base.controller.js';
import { parseCursorPaginationParams } from '../utils/functions/parse-cursor-pagination-params.function.js';
import { TweetService } from '../services/tweet.service.js';

class TweetController extends BaseController {
  protected tweet: TweetService;

  constructor() {
    super();
    this.tweet = new TweetService();
  }

  async findMany(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parseCursorPaginationParams(req.query);

    const tweets = await this.tweet.findMany(
      {
        OR: [
          {
            user: {
              following: {
                some: {
                  followerId: {
                    equals: loggedInUserId,
                  },
                },
              },
            },
          },
          {
            likes: {
              some: {
                user: {
                  following: {
                    some: {
                      followerId: {
                        equals: loggedInUserId,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      { offset, limit },
      loggedInUserId
    );

    // if not tweets then return next offset as null to indicate end of results
    const lastTweetId = tweets.length ? tweets[tweets.length - 1].id : null;

    return res.json({
      currentOffset: offset ?? null,
      currentLimit: limit,
      nextOffset: lastTweetId,
      records: tweets,
    });
  }

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

  async findOne(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);

    const tweet = await this.tweet.findUnique(
      {
        id: BigInt(req.params.tweetId).valueOf(),
      },
      loggedInUserId
    );

    return res.json(tweet);
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parseCursorPaginationParams(req.query);

    const tweets = await this.tweet.findMany(
      {
        userId: BigInt(req.params.userId).valueOf(),
        NOT: {
          type: TweetType.REPLY,
        },
      },
      { offset, limit },
      loggedInUserId
    );

    // if not tweets then return next offset as null to indicate end of results
    const lastTweetId = tweets.length ? tweets[tweets.length - 1].id : null;

    return res.json({
      currentOffset: offset ?? null,
      currentLimit: limit,
      nextOffset: lastTweetId,
      records: tweets,
    });
  }

  async findMediaByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parseCursorPaginationParams(req.query);

    const tweets = await this.tweet.findMany(
      {
        userId: BigInt(req.params.userId).valueOf(),
        attachments: { some: {} },
      },
      { offset, limit },
      loggedInUserId
    );

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
