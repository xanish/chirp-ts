import { Follow, Prisma } from '@prisma/client';
import BaseService from './base.service.js';
import { ParsedPaginationParams } from '../utils/types/parsed-pagination-params.type.js';

export class FollowService extends BaseService {
  async create(followerId: bigint, followingId: bigint): Promise<Follow> {
    return await this.prisma.follow.create({
      data: { followerId, followingId },
    });
  }

  async delete(
    followerId: bigint,
    followingId: bigint
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
  }

  async exists(
    followerId: bigint,
    followingId: bigint
  ): Promise<Follow | null> {
    return await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });
  }

  async followers(
    userId: bigint,
    pagination: ParsedPaginationParams,
    loggedInUserId: bigint
  ) {
    const { limit, offset } = pagination;

    return await this.prisma.follow.findMany({
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            following: {
              select: {
                followerId: true,
                followingId: true,
                createdAt: true,
              },
              where: {
                followerId: loggedInUserId,
              },
            },
          },
        },
      },
      where: {
        followingId: userId,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async followings(
    userId: bigint,
    pagination: ParsedPaginationParams,
    loggedInUserId: bigint
  ) {
    const { limit, offset } = pagination;

    return await this.prisma.follow.findMany({
      select: {
        following: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            following: {
              select: {
                followerId: true,
                followingId: true,
                createdAt: true,
              },
              where: {
                followerId: loggedInUserId,
              },
            },
          },
        },
      },
      where: {
        followerId: userId,
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
