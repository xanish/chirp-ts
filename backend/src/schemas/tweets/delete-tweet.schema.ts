import { Schema } from 'express-validator';

import isTweetPresent from '../../validators/is-tweet-present.js';

const DeleteTweetSchema: Schema = {
  tweetId: {
    in: ['params'],
    custom: {
      options: isTweetPresent,
    },
  },
};

export default DeleteTweetSchema;
