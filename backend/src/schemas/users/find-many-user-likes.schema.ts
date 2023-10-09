import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const FindManyUserLikesSchema: CustomExpressValidatorSchema = {
  userId: {
    in: ['params'],
    isUserPresent: true,
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 0 },
      errorMessage: 'The offset field must be a valid integer greater than 0',
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

export default FindManyUserLikesSchema;
