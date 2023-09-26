import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const ForgotPasswordUserSchema: CustomExpressValidatorSchema = {
  username: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The username field is required',
    },
    isUsernamePresent: true,
  },
};

export default ForgotPasswordUserSchema;
