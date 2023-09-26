import {
  ExpressValidator,
  CustomSchema,
  CustomValidationChain,
} from 'express-validator';
import isEmailAvailable from '../validators/is-email-available.js';
import isTweetPresent from '../validators/is-tweet-present.js';
import isUserPresent, {
  isUserIdOrUsernamePresent,
  isUsernamePresent,
} from '../validators/is-user-present.js';
import isUsernameAvailable from '../validators/is-username-available.js';
import isValidUploadedMedia from '../validators/is-valid-uploaded-media.js';

const CustomExpressValidator = new ExpressValidator({
  isEmailAvailable,
  isTweetPresent,
  isUserPresent,
  isUsernamePresent,
  isUserIdOrUsernamePresent,
  isUsernameAvailable,
  isValidUploadedMedia,
});

const { body, checkSchema } = CustomExpressValidator;

type CustomExpressValidatorChain = CustomValidationChain<
  typeof CustomExpressValidator
>;
type CustomExpressValidatorSchema = CustomSchema<typeof CustomExpressValidator>;

export {
  body,
  checkSchema,
  CustomExpressValidatorChain,
  CustomExpressValidatorSchema,
};
