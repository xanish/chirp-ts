import { PrismaClient } from '@prisma/client';
import { Snowflake } from 'nodejs-snowflake';

import AppConfig from '../config/app-config.js';
import { AuthService } from '../services/auth.service.js';

export default class BaseController {
  protected snowflake: Snowflake;
  protected auth: AuthService;

  constructor() {
    this.snowflake = new Snowflake({
      custom_epoch: +AppConfig.SNOWFLAKE_EPOCH,
      instance_id: +AppConfig.APP_INSTANCE_ID,
    });
    this.auth = new AuthService();
  }

  snowflakeId(): bigint {
    return this.snowflake.getUniqueID().valueOf();
  }
}
