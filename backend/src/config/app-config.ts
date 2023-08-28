export default {
  APP_ENV: process.env.NODE_ENV ?? 'prod',
  APP_NAME: process.env.APP_NAME ?? 'chirp',
  PORT: process.env.APP_PORT ?? 0,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_DURATION: process.env.JWT_DURATION ?? '1h',
} as const;
