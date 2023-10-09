import { NextFunction, Request, Response } from 'express';
import { TweetType } from '@prisma/client';
import BaseController from './base.controller.js';
import { parseCursorPaginationParams } from '../utils/functions/parse-cursor-pagination-params.function.js';
import { TweetService } from '../services/tweet.service.js';

class ReplyController extends BaseController {
  protected tweet: TweetService;

  constructor() {
    super();
    this.tweet = new TweetService();
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { limit, offset } = parseCursorPaginationParams(req.query);

    const replies = await this.tweet.findMany(
      {
        userId: BigInt(req.params.userId).valueOf(),
        type: TweetType.REPLY,
      },
      { limit, offset },
      loggedInUserId
    );

    // if not replies then return next offset as null to indicate end of results
    const lastReplyId = replies.length ? replies[replies.length - 1].id : null;

    return res.json({
      currentOffset: offset ?? null,
      currentLimit: limit ?? 10,
      nextOffset: lastReplyId,
      records: replies,
    });
  }

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { limit, offset } = parseCursorPaginationParams(req.query);

    const replies = await this.tweet.findMany(
      {
        relatedId: BigInt(req.params.tweetId).valueOf(),
        type: TweetType.REPLY,
      },
      { limit, offset },
      loggedInUserId
    );

    // if not replies then return next offset as null to indicate end of results
    const lastReplyId = replies.length ? replies[replies.length - 1].id : null;

    return res.json({
      currentOffset: req.query.offset ?? null,
      currentLimit: req.query.limit ?? 10,
      nextOffset: lastReplyId,
      records: replies,
    });
  }
}

export default new ReplyController();
