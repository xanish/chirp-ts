import { NextFunction, Request, Response } from 'express';
import BaseController from './base.controller.js';
import { parsePaginationParams } from '../utils/functions/parse-pagination-params.function.js';
import { UserService } from '../services/user.service.js';

class FollowController extends BaseController {
  protected user: UserService;

  constructor() {
    super();
    this.user = new UserService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [
      BigInt(req.body.followerId).valueOf(),
      BigInt(req.params.userId).valueOf(),
    ];

    const followExists = await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    if (followExists) {
      return res.json(followExists);
    }

    const newFollow = await this.prisma.follow.create({
      data: { followerId, followingId },
    });

    return res.json(newFollow);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [
      BigInt(req.body.followerId).valueOf(),
      BigInt(req.params.userId).valueOf(),
    ];

    const countDeleted = await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });

    return res.status(204).send();
  }

  async followersByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parsePaginationParams(req.query);

    const follows = await this.prisma.follow.findMany({
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
        followingId: BigInt(req.params.userId).valueOf(),
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset:
        follows.length < limit ? offset + follows.length : offset + limit,
      records: follows.map((follow) => follow.follower),
    });
  }

  async followingByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parsePaginationParams(req.query);

    const follows = await this.prisma.follow.findMany({
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
        followerId: BigInt(req.params.userId).valueOf(),
      },
      take: limit,
      skip: offset ? 1 : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset:
        follows.length < limit ? offset + follows.length : offset + limit,
      records: follows.map((follow) => follow.following),
    });
  }

  async suggestions(req: Request, res: Response, next: NextFunction) {
    const limit = 5;
    const userId = this.auth.id(req);

    const suggestions = await this.user.findMany(
      {
        id: {
          not: userId,
        },
        following: {
          none: {
            followerId: userId,
          },
        },
      },
      { limit: limit, offset: undefined }
    );

    return res.json({
      currentLimit: limit,
      currentOffset: null,
      records: suggestions,
    });
  }
}

export default new FollowController();
