import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Meta } from 'express-validator';
import AppConfig from '../config/app-config.js';

const isEmailAvailable = async (email: string, meta: Meta) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { email },
  });

  const token =
    meta.req.headers?.authorization?.replace('Bearer', '').trim() ?? '';
  const decoded: any = jwt.verify(token, AppConfig.JWT_SECRET);
  const userId = BigInt(decoded.id).valueOf();

  if (user && user.id !== userId) {
    throw new Error('The specified e-mail is already in use');
  }
};

export default isEmailAvailable;
