import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import BaseController from './base-controller.js';
import AppConfig from '../config/app-config.js';
import { AuthenticationError } from '../errors/authentication-error.js';

class AuthController extends BaseController {
  async register(req: Request, res: Response, next: NextFunction) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user: Prisma.UserCreateInput = req.body;

    return res.json(await this.prisma.user.create({ data: user }));
  }

  async verify(req: Request, res: Response, next: NextFunction) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;

    const user = await this.prisma.user.findFirstOrThrow({
      where: { username },
    });

    const matches = await bcrypt.compare(req.body.password, user.password);

    if (matches) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        AppConfig.JWT_SECRET
      );

      return res.json({ token });
    } else {
      return next(new AuthenticationError(401, 'Unauthorized'));
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController();
