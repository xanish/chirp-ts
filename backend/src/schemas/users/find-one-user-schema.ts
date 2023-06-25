import { Schema } from 'express-validator';

import isUserPresent from '../../validators/is-user-present.js';

const FindOneUserSchema: Schema = {
  userId: {
    in: ['params'],
    custom: {
      options: isUserPresent,
    },
  },
};

export default FindOneUserSchema;
