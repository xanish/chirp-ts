import { Prisma, TweetType } from '@prisma/client';
import BaseService from './base.service.js';
import { ParsedCursorPaginationParams } from '../utils/types/parsed-cursor-pagination-params.type.js';

export class TweetService extends BaseService {
  async findMany(
    where: Prisma.TweetWhereInput,
    pagination: ParsedCursorPaginationParams,
    loggedInUserId: bigint
  ) {
    const { limit, offset } = pagination;

    // a tweet object would always need
    // 1. user
    // 2. attachments
    // 3. related tweet if any
    // 4. count of likes, replies, quotes (this is still todo)
    // 5. liked by logged in user or not
    const tweets = this.prisma.tweet.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        related: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        attachments: true,
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
        likes: {
          select: {
            createdAt: true,
          },
          where: {
            userId: loggedInUserId,
          },
        },
      },
      where: where,
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: offset } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tweets;
  }

  async findUnique(
    where: Prisma.TweetWhereUniqueInput,
    loggedInUserId: bigint
  ) {
    // a tweet object would always need
    // 1. user
    // 2. attachments
    // 3. related tweet if any
    // 4. count of likes, replies, quotes (this is still todo)
    // 5. liked by logged in user or not
    const tweets = this.prisma.tweet.findUnique({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        related: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        attachments: true,
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
        likes: {
          select: {
            createdAt: true,
          },
          where: {
            userId: loggedInUserId,
          },
        },
      },
      where: where,
    });

    return tweets;
  }
}
