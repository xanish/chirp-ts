import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class UserController extends BaseController {
  async findMany(req: Request, res: Response, next: NextFunction) {
    res.json(
      await this.prisma.user.findMany({
        skip: +(req.query.offset || 0),
        take: +(req.query.limit || 10),
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
      })
    );
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.userId;

    res.json(
      await this.prisma.user.findFirstOrThrow({
        where: { id },
      })
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const user: Prisma.UserCreateInput = req.body;

    res.json(await this.prisma.user.create({ data: user }));
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const user: Prisma.UserUpdateInput = req.body;
    const id = req.params.userId;

    res.json(
      await this.prisma.user.update({
        where: { id },
        data: user,
      })
    );
  }
}

export default new UserController();
