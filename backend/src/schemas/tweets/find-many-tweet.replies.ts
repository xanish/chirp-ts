import { Schema } from 'express-validator';

import isTweetPresent from '../../validators/is-tweet-present.js';

const FindManyTweetRepliesSchema: Schema = {
  tweetId: {
    in: ['params'],
    custom: {
      options: isTweetPresent,
    },
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    custom: {
      options: isTweetPresent,
      errorMessage: 'The offset field must be a valid tweet id',
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

export default FindManyTweetRepliesSchema;