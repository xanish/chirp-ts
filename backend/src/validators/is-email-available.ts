import { PrismaClient } from '@prisma/client';
import { Meta } from 'express-validator';

const isEmailAvailable = async (email: string, meta: Meta) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { email },
  });

  // todo: check if logged in user actually has the same email
  // as the one fetched above and allow request to go through

  if (user) {
    throw new Error('The specified e-mail is already in use');
  }
};

export { isEmailAvailable };
