import './bootstrap/env.js';

import express, { Express } from 'express';
import Cors from 'cors';
import AppConfig from './config/app-config.js';
import bootstrapRoutes from './bootstrap/routes.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import GracefulShutdown from 'http-graceful-shutdown';
import { Server } from 'http';
import HttpLogging from './middlewares/http-logging.middleware.js';
import { ApplicationError } from './errors/application.error.js';

const app: Express = express();

// setup bigint handling
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Show routes called in console
app.use(HttpLogging);
app.use(Cors());

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

process.on('uncaughtException', (err: Error) => {
  errorHandler.handleUncaught(err);
});
process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    // reason and promise are unreliable and hence should not be checked
    errorHandler.handleUncaught(
      new ApplicationError('Unhandled promise rejection encountered', 500)
    );
  }
);
