import { Schema } from 'express-validator';

import isTweetPresent from '../../validators/is-tweet-present.js';
import isUserPresent from '../../validators/is-user-present.js';
import isValidUploadedMedia from '../../validators/is-valid-uploaded-media.js';

const CreateTweetSchema: Schema = {
  content: {
    in: ['body'],
    exists: {
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

  isReply: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isBoolean: {
      errorMessage: 'The is reply field must be a boolean',
    },
  },

  parentId: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    custom: {
      options: isTweetPresent,
    },
  },

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

  quoteTweetId: {
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
