import './bootstrap/env.js';

import morgan from 'morgan';
import express, { Express, Request, Response, NextFunction } from 'express';
import AppConfig from './config/app-config.js';
import bootstrapRoutes from './bootstrap/routes.js';

const app: Express = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup application routes
bootstrapRoutes(app);

// Show routes called in console
if (AppConfig.APP_ENV === 'dev') app.use(morgan('dev'));

export class ErrorWithStatus extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// Add error handler
app.use(
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);

    if (req.app.get('env') === 'dev') {
      return res.json({ error: err });
    }

    return res.json({ error: 'Internal Server Error' });
  }
);

app.listen(AppConfig.PORT, () => {
  console.log(`Server is running at http://localhost:${AppConfig.PORT}`);
});
