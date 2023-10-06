import { PrismaClient } from '@prisma/client';
import AppConfig from '../config/app-config.js';

declare global {
  var prismaClient: PrismaClient;
}

let prismaClient: PrismaClient;

if (AppConfig.APP_ENV === 'prod') {
  prismaClient = new PrismaClient();
} else {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient();
  }
  prismaClient = global.prismaClient;
}

export default prismaClient;
