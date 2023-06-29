import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class UserController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {
    const offset = +(req.query.offset || 0);
    const limit = +(req.query.limit || 10);

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        username: {
          contains: req.query.term?.toString(),
        },
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    return res.json({
      currentLimit: limit,
      currentOffset: offset,
      nextOffset: users.length < limit ? null : offset + limit,
      records: users,
    });
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.userId;

    const user = await this.prisma.user.findFirstOrThrow({ where: { id } });

    return res.json(user);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const user: Prisma.UserCreateInput = req.body;

    return res.json(await this.prisma.user.create({ data: user }));
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.userId;
    const data: Prisma.UserUpdateInput = req.body;

    const user = await this.prisma.user.update({
      where: { id },
      data: data,
    });

    return res.json(user);
  }
}

export default new UserController();
