import { Schema } from 'express-validator';

import { isUsernamePresent } from '../../validators/is-user-present.js';

const ForgotPasswordUserSchema: Schema = {
  username: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The username field is required',
    },
    custom: {
      options: isUsernamePresent,
    },
  },
};

export default ForgotPasswordUserSchema;
