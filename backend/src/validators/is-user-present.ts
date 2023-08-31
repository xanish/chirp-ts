import { PrismaClient } from '@prisma/client';

const isUserPresent = async (id: string) => {
  const prisma: PrismaClient = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id: BigInt(id).valueOf() },
  });

  if (!user) {
    throw new Error('The specified user does not exist');
  }
};

export default isUserPresent;
