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
    user.id = this.snowflakeId();

    // todo: trigger verify user mail

    return res.json(await this.prisma.user.create({ data: user }));
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = jwt.verify(req.params.token, AppConfig.JWT_SECRET);
      const id = BigInt((<{ id: string; username: string }>decoded).id);

      const user = await this.prisma.user.findFirst({ where: { id } });

      if (user) {
        await this.prisma.user.update({
          where: { id },
          data: { isVerified: true },
        });

        return res.send('Ok');
      } else {
        return res.status(400).send('Failed to verify');
      }
    } catch (err) {
      return next(
        new AuthenticationError(400, (<{ message: string }>err).message)
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;

    const user = await this.prisma.user.findFirstOrThrow({
      where: { username },
    });

    if (user.isVerified === false) {
      return next(new AuthenticationError(403, 'Forbidden'));
    }

    const matches = await bcrypt.compare(req.body.password, user.password);

    if (matches) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        AppConfig.JWT_SECRET,
        { expiresIn: AppConfig.JWT_DURATION }
      );

      return res.json({ token });
    } else {
      return next(new AuthenticationError(401, 'Unauthorized'));
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const { username, password } = req.body;

    const userExists = await this.prisma.user.findFirst({
      where: { username },
    });

    if (userExists) {
      const user = await this.prisma.user.update({
        where: { username },
        data: { password },
      });

      // todo: send password updated mail

      return res.json(user);
    }
  }
}

export default new AuthController();