import { NextFunction, Request, Response } from 'express';
import BaseController from './base.controller.js';
import { TweetType } from '@prisma/client';
import { parsePaginationParams } from '../utils/functions/parse-pagination-params.function.js';
import { LikeService } from '../services/like.service.js';

class LikeController extends BaseController {
  protected like: LikeService;

  constructor() {
    super();
    this.like = new LikeService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const [userId, tweetId] = [
      BigInt(req.body.userId).valueOf(),
      BigInt(req.params.tweetId).valueOf(),
    ];

    const likeExists = await this.like.exists(userId, tweetId);

    if (likeExists) {
      return res.json(likeExists);
    }

    const newLike = await this.like.create(userId, tweetId);

    return res.json(newLike);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const [userId, tweetId] = [
      BigInt(req.body.userId).valueOf(),
      BigInt(req.params.tweetId).valueOf(),
    ];

    const countDeleted = await this.like.delete(userId, tweetId);

    return res.status(204).send();
  }

  async findByUser(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    const { offset, limit } = parsePaginationParams(req.query);

    const likes = await this.like.findManyUserLikes(
      BigInt(req.params.userId).valueOf(),
      { offset, limit },
      loggedInUserId
    );

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: likes.length < limit ? offset + likes.length : offset + limit,
      records: likes.map((like) => like.tweet),
    });
  }

  async findByTweet(req: Request, res: Response, next: NextFunction) {
    const { offset, limit } = parsePaginationParams(req.query);

    const likes = await this.like.findManyTweetLikes(
      BigInt(req.params.tweetId),
      { offset, limit }
    );

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: likes.length < limit ? offset + likes.length : offset + limit,
      records: likes.map((like) => like.user),
    });
  }
}

export default new LikeController();
