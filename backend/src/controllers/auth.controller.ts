import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BaseController from './base.controller.js';
import AppConfig from '../config/app-config.js';
import { AuthenticationError } from '../errors/authentication.error.js';
import { UserService } from '../services/user.service.js';

class AuthController extends BaseController {
  protected user: UserService;

  constructor() {
    super();
    this.user = new UserService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user: Prisma.UserCreateInput = req.body;
    user.id = this.snowflakeId();

    // todo: trigger verify user mail

    return res.json(await this.user.create(user));
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded: any = jwt.verify(req.params.token, AppConfig.JWT_SECRET);
      const id = BigInt(decoded.id).valueOf();

      const user = await this.user.findOneForAuth({ id });

      if (user) {
        await this.user.update({ isVerified: true }, { id });

        return res.status(200).send();
      } else {
        return res.status(400).send('Failed to verify');
      }
    } catch (e: any) {
      return next(new AuthenticationError(e.message, 400));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    let user;

    try {
      user = await this.user.findOneForAuth({ username });
    } catch (e) {
      return next(new AuthenticationError('Unauthorized', 401));
    }

    if (user!.isVerified === false) {
      return next(new AuthenticationError('Forbidden', 403));
    }

    const matches = await bcrypt.compare(req.body.password, user!.password);

    if (matches) {
      return res.json({
        token: this.auth.token({
          id: user!.id,
          username: user!.username,
          firstName: user!.firstName,
          lastName: user!.lastName,
        }),
      });
    } else {
      return next(new AuthenticationError('Unauthorized', 401));
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    const user = await this.user.findOneForAuth({ username });

    if (user) {
      const token = this.auth.token({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      // todo: send password reset mail with token

      return res.status(200).send();
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded: any = jwt.verify(req.params.token, AppConfig.JWT_SECRET);
      const id = BigInt(decoded.id).valueOf();

      const userExists = await this.user.findOneForAuth({ id });

      req.body.password = await bcrypt.hash(req.body.password, 10);
      const { username, password } = req.body;

      if (userExists) {
        const user = await this.user.update({ password }, { username });

        // todo: send password updated mail

        return res.json(user);
      }
    } catch (e: any) {
      return next(new AuthenticationError(e.message, 400));
    }
  }
}

export default new AuthController();
