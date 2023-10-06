import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const FindManyUserSchema: CustomExpressValidatorSchema = {
  term: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'The term field must be a valid string',
    },
    isLength: {
      options: { max: 64 },
      errorMessage: 'The term field must be at most 64 characters long',
    },
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isUserPresent: {
      errorMessage: 'The offset field must be a valid user id',
    },
  },

  limit: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 0 },
      errorMessage:
        'The limit field must be a valid integer greater than or equal to 0',
    },
  },
};

export default FindManyUserSchema;
