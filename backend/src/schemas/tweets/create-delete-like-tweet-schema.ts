import { Schema } from 'express-validator';

import isTweetPresent from '../../validators/is-tweet-present.js';
import isUserPresent from '../../validators/is-user-present.js';

const CreateDeleteLikeTweetSchema: Schema = {
  tweetId: {
    in: ['params'],
    custom: {
      options: isTweetPresent,
    },
  },

  userId: {
    in: ['body'],
    custom: {
      options: isUserPresent,
    },
  },
};

export default CreateDeleteLikeTweetSchema;
