import { Request } from 'express';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app-config.js';
import { ApplicationError } from '../errors/application.error.js';

export class AuthService {
  id(req: Request): bigint {
    const token = req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);

    if (decoded && decoded.id) {
      return BigInt(decoded.id).valueOf();
    }

    throw new ApplicationError('Unauthorized', 401);
  }

  token(user: any): string {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      AppConfig.JWT_SECRET,
      { expiresIn: AppConfig.JWT_DURATION }
    );
  }
}
