export default {
  ENV: process.env.APP_ENV ?? 'dev',
  APP_NAME: process.env.APP_NAME ?? 'chirp',
  PORT: process.env.APP_PORT ?? 0,
} as const;
