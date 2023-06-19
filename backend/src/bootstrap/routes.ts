import { Express } from 'express';

import userRouter from '../routes/users.js';

export default function bootstrapRoutes(app: Express) {
  app.use('/users', userRouter);
}
