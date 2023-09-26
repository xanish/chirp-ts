import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const FindOneUserSchema: CustomExpressValidatorSchema = {
  userId: {
    in: ['params'],
    isUserIdOrUsernamePresent: true,
  },
};

export default FindOneUserSchema;
