import { Schema } from 'express-validator';

import { isUserIdOrUsernamePresent } from '../../validators/is-user-present.js';

const FindOneUserSchema: Schema = {
  userId: {
    in: ['params'],
    custom: {
      options: isUserIdOrUsernamePresent,
    },
  },
};

export default FindOneUserSchema;
