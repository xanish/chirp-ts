import { checkSchema } from 'express-validator';

// controllers
import AuthController from '../controllers/auth-controller.js';

// validation schemas
import RegisterUserSchema from '../schemas/auth/register-user-schema.js';
import LoginUserSchema from '../schemas/auth/login-user-schema.js';

// middlewares
import validateRequest from '../middlewares/validate-request.js';

export default [
  {
    method: 'post',
    path: '/auth/register',
    middlewares: [checkSchema(RegisterUserSchema), validateRequest],
    action: AuthController.register.bind(AuthController),
  },
  {
    method: 'post',
    path: '/auth/verify/:token',
    middlewares: [],
    action: AuthController.verify.bind(AuthController),
  },
  {
    method: 'post',
    path: '/auth/login',
    middlewares: [checkSchema(LoginUserSchema), validateRequest],
    action: AuthController.login.bind(AuthController),
  },
  {
    method: 'post',
    path: '/auth/forgot-password',
    middlewares: [checkSchema(LoginUserSchema), validateRequest],
    action: AuthController.forgotPassword.bind(AuthController),
  },
];
