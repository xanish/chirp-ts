import { Meta, Schema } from 'express-validator';
import { TweetType } from '@prisma/client';

import isTweetPresent from '../../validators/is-tweet-present.js';
import isUserPresent from '../../validators/is-user-present.js';
import isValidUploadedMedia from '../../validators/is-valid-uploaded-media.js';

const CreateTweetSchema: Schema = {
  userId: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The user id field is required',
      bail: true,
    },
    custom: {
      options: isUserPresent,
    },
  },

  content: {
    in: ['body'],
    exists: {
      if: (value: string, meta: Meta) =>
        meta.req.body.type != TweetType.RETWEET,
      options: {
        checkNull: true,
      },
      errorMessage: 'The content field is required',
    },
    isLength: {
      options: { min: 1, max: 512 },
      errorMessage:
        'The content field must have length between 1 and 512 characters',
    },
  },

  type: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isIn: {
      options: [
        [TweetType.QUOTE, TweetType.REPLY, TweetType.RETWEET, TweetType.TWEET],
      ],
      errorMessage:
        'The type field must have a value from ("QUOTE", "REPLY", "RETWEET", "TWEET")',
    },
  },

  relatedId: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    custom: {
      options: isTweetPresent,
    },
  },

  attachments: {
    optional: {
      options: { nullable: true },
    },
    isArray: {
      options: { max: 4 },
      errorMessage:
        'The attachments field must be an array with at most 4 medias',
    },
  },

  'attachments.*': {
    isString: {
      errorMessage: 'The attachments field must contain valid strings',
      bail: true,
    },
    custom: {
      options: isValidUploadedMedia,
    },
  },
};

export default CreateTweetSchema;
