import { NextFunction, Request, Response } from 'express';
import { TweetType } from '@prisma/client';
import BaseController from './base.controller.js';
import { parseCursorPaginationParams } from '../utils/functions/parse-cursor-pagination-params.function.js';

class ReplyController extends BaseController {
  async findByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { limit, offset } = parseCursorPaginationParams(req.query);

    const replies = await this.prisma.tweet.findMany({
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
            replies: {
              where: {
                type: TweetType.REPLY,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId: BigInt(req.params.userId).valueOf(),
        type: TweetType.REPLY,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: offset } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

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

    const replies = await this.prisma.tweet.findMany({
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
            replies: {
              where: {
                type: TweetType.REPLY,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        relatedId: BigInt(req.params.tweetId).valueOf(),
        type: TweetType.REPLY,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: offset } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

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
