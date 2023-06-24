import { Express } from 'express';

import userRoutes from '../routes/user-routes.js';

const routes = [...userRoutes];

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
