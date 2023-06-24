export default {
  APP_ENV: process.env.NODE_ENV ?? 'prod',
  APP_NAME: process.env.APP_NAME ?? 'chirp',
  PORT: process.env.APP_PORT ?? 0,
} as const;
