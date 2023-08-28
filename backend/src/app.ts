import './bootstrap/env.js';

import morgan from 'morgan';
import express, { Express, Request, Response, NextFunction } from 'express';
import AppConfig from './config/app-config.js';
import bootstrapRoutes from './bootstrap/routes.js';
import { BaseError } from './errors/base-error.js';

const app: Express = express();

// setup bigint handling
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup application routes
bootstrapRoutes(app);

// Show routes called in console
if (AppConfig.APP_ENV === 'dev') app.use(morgan('dev'));

// Add error handler
app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);

  if (typeof err['serialize'] === 'function') {
    return res.json(err.serialize());
  }

  if (req.app.get('env') === 'dev') {
    return res.json({ error: err });
  }

  return res.json({ error: 'Internal Server Error' });
});

app.listen(AppConfig.PORT, () => {
  console.log(`Server is running at http://localhost:${AppConfig.PORT}`);
});
