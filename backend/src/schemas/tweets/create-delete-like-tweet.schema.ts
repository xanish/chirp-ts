import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const CreateDeleteLikeTweetSchema: CustomExpressValidatorSchema = {
  tweetId: {
    in: ['params'],
    isTweetPresent: true,
  },

  userId: {
    in: ['body'],
    isUserPresent: true,
  },
};

export default CreateDeleteLikeTweetSchema;
