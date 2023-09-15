import { Schema } from 'express-validator';

import isUserPresent from '../../validators/is-user-present.js';

const FindManyUserLikesSchema: Schema = {
  userId: {
    in: ['params'],
    custom: {
      options: isUserPresent,
    },
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 0 },
      errorMessage: 'The offset field must be a valid integer greater than 0',
    },
  },

  limit: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 0, max: 1000 },
      errorMessage:
        'The limit field must be a valid integer between 0 and 1000',
    },
  },
};

export default FindManyUserLikesSchema;
