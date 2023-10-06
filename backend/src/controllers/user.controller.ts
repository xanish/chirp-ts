import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import BaseController from './base.controller.js';
import { ApplicationError } from '../errors/application.error.js';
import { parseCursorPaginationParams } from '../utils/functions/parse-cursor-pagination-params.function.js';
import { UserService } from '../services/user.service.js';

class UserController extends BaseController {
  protected user: UserService;

  constructor() {
    super();
    this.user = new UserService();
  }

  async findMany(req: Request, res: Response, next: NextFunction) {
    const { offset, limit } = parseCursorPaginationParams(req.query);

    const users = await this.user.findMany(
      {
        username: {
          contains: req.query.term?.toString(),
        },
      },
      { offset, limit }
    );

    // if not users then return next offset as null to indicate end of results
    const lastUserId = users.length ? users[users.length - 1].id : null;

    return res.json({
      currentOffset: offset ?? null,
      currentLimit: limit,
      nextOffset: lastUserId,
      records: users,
    });
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const loggedInUserId = this.auth.id(req);
    let where: any = {};

    try {
      where.id = BigInt(req.params.userId).valueOf();
    } catch (e) {
      where.username = req.params.userId;
    }

    try {
      const user = await this.user.findOne(where);

      return res.json(user);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = BigInt(req.params.userId).valueOf();
    const data: Prisma.UserUpdateInput = req.body;

    const user = await this.user.update(data, { id });

    return res.json(user);
  }
}

export default new UserController();
