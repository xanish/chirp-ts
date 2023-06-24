import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import BaseController from './base-controller.js';

class UserController extends BaseController {
  all(req: Request, res: Response, next: NextFunction) {}

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
