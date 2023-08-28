export default {
  APP_ENV: process.env.NODE_ENV ?? 'prod',
  APP_NAME: process.env.APP_NAME ?? 'chirp',
  APP_INSTANCE_ID: process.env.APP_INSTANCE_ID ?? 1,
  PORT: process.env.APP_PORT ?? 0,
  SNOWFLAKE_EPOCH: process.env.SNOWFLAKE_EPOCH ?? 1672531200000,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_DURATION: process.env.JWT_DURATION ?? '1h',
} as const;
