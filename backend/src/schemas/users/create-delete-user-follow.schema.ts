import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const CreateDeleteUserFollowSchema: CustomExpressValidatorSchema = {
  userId: {
    in: ['params'],
    isUserPresent: true,
  },

  followerId: {
    in: ['body'],
    isUserPresent: true,
  },
};

export default CreateDeleteUserFollowSchema;
