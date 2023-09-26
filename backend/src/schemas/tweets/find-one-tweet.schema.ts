import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const FindOneTweetSchema: CustomExpressValidatorSchema = {
  tweetId: {
    in: ['params'],
    isTweetPresent: true,
  },
};

export default FindOneTweetSchema;
