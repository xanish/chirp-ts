import { Schema } from 'express-validator';

import isUserPresent from '../../validators/is-user-present.js';

const CreateDeleteUserFollowSchema: Schema = {
  userId: {
    in: ['params'],
    custom: {
      options: isUserPresent,
    },
  },

  followerId: {
    in: ['body'],
    custom: {
      options: isUserPresent,
    },
  },
};

export default CreateDeleteUserFollowSchema;
