import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class UserController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ?? undefined;
    const limit = +(req.query.limit || 10);

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
      where: {
        username: {
          contains: req.query.term?.toString(),
        },
      },
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: BigInt(offset.toString()).valueOf() } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

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
    let where: any = {};

    try {
      where.id = BigInt(req.params.userId).valueOf();
    } catch (e) {
      where.username = req.params.userId;
    }

    const user = await this.prisma.user.findFirstOrThrow({ where });

    return res.json(user);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = BigInt(req.params.userId).valueOf();
    const data: Prisma.UserUpdateInput = req.body;

    const user = await this.prisma.user.update({
      where: { id },
      data: data,
    });

    return res.json(user);
  }
}

export default new UserController();
