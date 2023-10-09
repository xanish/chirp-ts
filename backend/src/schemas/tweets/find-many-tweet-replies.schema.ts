import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const FindManyTweetRepliesSchema: CustomExpressValidatorSchema = {
  tweetId: {
    in: ['params'],
    isTweetPresent: true,
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isTweetPresent: {
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