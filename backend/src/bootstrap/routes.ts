import { Express } from 'express';

import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';
import tweetRoutes from '../routes/tweet.routes.js';
import attachmentRoutes from '../routes/attachment.routes.js';
import suggestionRoutes from '../routes/suggestion.routes.js';

const routes = [
  ...authRoutes,
  ...userRoutes,
  ...tweetRoutes,
  ...attachmentRoutes,
  ...suggestionRoutes,
];

export default function bootstrapRoutes(app: Express) {
  for (let route of routes) {
    switch (route.method) {
      case 'get':
        app.get(route.path, ...route.middlewares, route.action);
        break;

      case 'post':
        app.post(route.path, ...route.middlewares, route.action);
        break;

      case 'put':
        app.put(route.path, ...route.middlewares, route.action);
        break;

      case 'delete':
        app.delete(route.path, ...route.middlewares, route.action);
        break;

      default:
        break;
    }
  }
}
