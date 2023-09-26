import { Meta } from 'express-validator';
import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

import { TweetType } from '@prisma/client';

const CreateTweetSchema: CustomExpressValidatorSchema = {
  userId: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The user id field is required',
      bail: true,
    },
    isUserPresent: true,
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
    isTweetPresent: true,
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
    isValidUploadedMedia: true,
  },
};

export default CreateTweetSchema;
