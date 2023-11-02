import { Like, LikePayload, Prisma, TweetType } from '@prisma/client';
import BaseService from './base.service.js';
import { ParsedPaginationParams } from '../utils/types/parsed-pagination-params.type.js';

export class LikeService extends BaseService {
  async create(userId: bigint, tweetId: bigint): Promise<Like> {
    return await this.prisma.like.create({
      data: { userId, tweetId },
    });
  }

  async delete(userId: bigint, tweetId: bigint): Promise<Prisma.BatchPayload> {
    return await this.prisma.like.deleteMany({
      where: { userId, tweetId },
    });
  }

  async exists(userId: bigint, tweetId: bigint) {
    return await this.prisma.like.findFirst({
      where: { userId, tweetId },
    });
  }

  async findManyTweetLikes(
    tweetId: bigint,
    pagination: ParsedPaginationParams
  ) {
    const { limit, offset } = pagination;

    return await this.prisma.like.findMany({
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
        tweetId: tweetId,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findManyUserLikes(
    userId: bigint,
    pagination: ParsedPaginationParams,
    loggedInUserId: bigint
  ) {
    const { limit, offset } = pagination;

    return await this.prisma.like.findMany({
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
        },
      },
      where: {
        userId: userId,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
