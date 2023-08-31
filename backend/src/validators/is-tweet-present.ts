import { PrismaClient } from '@prisma/client';
import { CustomValidator } from 'express-validator';

const isTweetPresent: CustomValidator = async (id: string) => {
  const prisma: PrismaClient = new PrismaClient();

  const tweet = await prisma.tweet.findUnique({
    where: { id: BigInt(id).valueOf() },
  });

  if (!tweet) {
    throw new Error('The specified tweet does not exist');
  }
};

export default isTweetPresent;
