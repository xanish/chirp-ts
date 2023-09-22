import { Schema } from 'express-validator';

import isTweetPresent from '../../validators/is-tweet-present.js';

const FindOneTweetSchema: Schema = {
  tweetId: {
    in: ['params'],
    custom: {
      options: isTweetPresent,
    },
  },
};

export default FindOneTweetSchema;
