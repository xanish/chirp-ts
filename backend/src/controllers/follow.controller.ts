import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app-config.js';
import BaseController from './base.controller.js';

class FollowController extends BaseController {
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
    const token = req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
    const userId = BigInt(decoded.id);
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

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
                followerId: userId.valueOf(),
              },
            },
          },
        },
      },
      where: {
        followingId: BigInt(req.params.userId).valueOf(),
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: follows.length < limit ? null : offset + limit,
      records: follows.map((follow) => follow.follower),
    });
  }

  async followingByUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
    const userId = BigInt(decoded.id);
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

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
                followerId: userId.valueOf(),
              },
            },
          },
        },
      },
      where: {
        followerId: BigInt(req.params.userId).valueOf(),
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: follows.length < limit ? null : offset + limit,
      records: follows.map((follow) => follow.following),
    });
  }
}

export default new FollowController();