import { PrismaClient } from '@prisma/client';
import { Meta } from 'express-validator';

const isUserPresent = async (id: string) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('The specified user does not exist');
  }
};

export { isUserPresent };
