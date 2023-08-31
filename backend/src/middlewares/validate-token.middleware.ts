import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
import prismaClient from "../bootstrap/prisma-client.js";
import AppConfig from "../config/app-config.js";
import { AuthenticationError } from "../errors/authentication.error.js";

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization?.replace('Bearer', '').trim();

      const decoded = jwt.verify(token, AppConfig.JWT_SECRET);
      const id = BigInt((<{ id: string; username: string }>decoded).id);

      const user = await prismaClient.user.findFirst({ where: { id } });

      if (user) {
        return next();
      }
    }

    return res.status(400).send('Unauthorized');
  } catch (err) {
    if (err instanceof Error) {
      return next(
        new AuthenticationError(err.message, 401)
      );
    }

    return next(
      new AuthenticationError('Unauthorized', 401)
    );
  }
}
