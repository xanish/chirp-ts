import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class ReplyController extends BaseController {
  async findByUser(req: Request, res: Response, next: NextFunction) {
    const replies = await this.prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        attachments: {
          select: {
            type: true,
            content: true,
          },
        },
        parent: {
          select: {
            id: true,
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
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId: req.params.userId,
        isReply: true,
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? 1 : undefined,
      cursor: req.query.offset ? { id: req.query.offset + '' } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // if not replies then return next offset as null to indicate end of results
    const lastReplyId = replies.length ? replies[replies.length - 1].id : null;

    res.json({
      currentOffset: req.query.offset ?? null,
      currentLimit: req.query.limit ?? 10,
      nextOffset: lastReplyId,
      records: replies,
    });
  }

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const replies = await this.prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
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
        parentId: req.params.tweetId,
        isReply: true,
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? 1 : undefined,
      cursor: req.query.offset ? { id: req.query.offset + '' } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // if not replies then return next offset as null to indicate end of results
    const lastReplyId = replies.length ? replies[replies.length - 1].id : null;

    res.json({
      currentOffset: req.query.offset ?? null,
      currentLimit: req.query.limit ?? 10,
      nextOffset: lastReplyId,
      records: replies,
    });
  }
}

export default new ReplyController();
