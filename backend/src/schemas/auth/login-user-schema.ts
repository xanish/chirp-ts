import { Schema } from 'express-validator';

const LoginUserSchema: Schema = {
  username: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The username field is required',
    },
  },

  password: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The password field is required',
    },
  },
};

export default LoginUserSchema;
