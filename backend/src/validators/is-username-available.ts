import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Meta } from 'express-validator';
import AppConfig from '../config/app-config.js';

const isUsernameAvailable = async (username: string, meta: Meta) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { username },
  });

  const token =
    meta.req.headers?.authorization?.replace('Bearer', '').trim() ?? '';
  if (token !== '') {
    const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
    const userId = BigInt(decoded.id).valueOf();

    if (user && user.id !== userId) {
      throw new Error('The specified username is already in use');
    }
  } else if (user) {
    throw new Error('The specified username is already in use');
  }
};

export default isUsernameAvailable;
