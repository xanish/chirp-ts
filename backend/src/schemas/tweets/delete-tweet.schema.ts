import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const DeleteTweetSchema: CustomExpressValidatorSchema = {
  tweetId: {
    in: ['params'],
    isTweetPresent: true,
  },
};

export default DeleteTweetSchema;
