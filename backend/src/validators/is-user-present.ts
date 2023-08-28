import { PrismaClient } from '@prisma/client';

const isUserPresent = async (id: bigint) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('The specified user does not exist');
  }
};

export default isUserPresent;
