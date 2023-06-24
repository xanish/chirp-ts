import { PrismaClient } from '@prisma/client';

export default class BaseController {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
