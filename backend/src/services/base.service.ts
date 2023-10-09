import { PrismaClient } from '@prisma/client';

import prismaClient from '../bootstrap/prisma-client.js';

export default class BaseService {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }
}
