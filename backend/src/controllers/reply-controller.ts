import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';
import { TweetType } from '@prisma/client';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app-config.js';

class ReplyController extends BaseController {
  async findByUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
    const userId = BigInt(decoded.id);

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
            userId: BigInt(userId).valueOf(),
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
      where: {
        userId: BigInt(req.params.userId).valueOf(),
        type: TweetType.REPLY,
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? 1 : undefined,
      cursor: req.query.offset
        ? { id: BigInt(req.query.offset.toString()).valueOf() }
        : undefined,
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

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
    const userId = BigInt(decoded.id);

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
            userId: BigInt(userId).valueOf(),
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
      where: {
        relatedId: BigInt(req.params.tweetId).valueOf(),
        type: TweetType.REPLY,
      },
      take: +(req.query.limit || 10),
      skip: req.query.offset ? 1 : undefined,
      cursor: req.query.offset
        ? { id: BigInt(req.query.offset.toString()).valueOf() }
        : undefined,
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
