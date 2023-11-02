import { NextFunction, Request, Response } from 'express';
import BaseController from './base.controller.js';
import { parsePaginationParams } from '../utils/functions/parse-pagination-params.function.js';
import { UserService } from '../services/user.service.js';
import { FollowService } from '../services/follow.service.js';

class FollowController extends BaseController {
  protected user: UserService;
  protected follow: FollowService;

  constructor() {
    super();
    this.user = new UserService();
    this.follow = new FollowService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [
      BigInt(req.body.followerId).valueOf(),
      BigInt(req.params.userId).valueOf(),
    ];

    const followExists = await this.follow.exists(followerId, followingId);

    if (followExists) {
      return res.json(followExists);
    }

    const newFollow = await this.follow.create(followerId, followingId);

    return res.json(newFollow);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const [followerId, followingId] = [
      BigInt(req.body.followerId).valueOf(),
      BigInt(req.params.userId).valueOf(),
    ];

    const countDeleted = await this.follow.delete(followerId, followingId);

    return res.status(204).send();
  }

  async followersByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parsePaginationParams(req.query);

    const follows = await this.follow.followers(
      BigInt(req.params.userId).valueOf(),
      { offset, limit },
      loggedInUserId
    );

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

    const follows = await this.follow.followings(
      BigInt(req.params.userId).valueOf(),
      { offset, limit },
      loggedInUserId
    );

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
