import './bootstrap/env.js';

import morgan from 'morgan';
import express, { Express } from 'express';
import AppConfig from './config/app-config.js';
import bootstrapRoutes from './bootstrap/routes.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import GracefulShutdown from 'http-graceful-shutdown';
import { Server } from 'http';

const app: Express = express();

// setup bigint handling
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Show routes called in console
if (AppConfig.APP_ENV === 'dev') app.use(morgan('dev'));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup application routes
bootstrapRoutes(app);

// Add error handler
app.use(errorHandler.handle.bind(errorHandler));

const server: Server = app.listen(AppConfig.PORT, () => {
  console.log(`Server is running at http://localhost:${AppConfig.PORT}`);
});

GracefulShutdown(server, {
  timeout: 30000,
  signals: 'SIGINT SIGTERM',
  development: AppConfig.APP_ENV === 'dev',
  forceExit: true,
});
