import { PrismaClient } from '@prisma/client';

const isUsernameAvailable = async (username: string) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { username },
  });

  // todo: check if logged in user actually has the same email
  // as the one fetched above and allow request to go through

  if (user) {
    throw new Error('The specified username is already in use');
  }
};

export { isUsernameAvailable };
