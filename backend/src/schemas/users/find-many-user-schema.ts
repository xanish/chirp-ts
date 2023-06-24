import { Schema } from 'express-validator';

const FindManyUserSchema: Schema = {
  term: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'The term field must be a valid string',
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        'The term field must have length between 2 and 64 characters',
    },
  },

  offset: {
    in: ['query'],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 0 },
      errorMessage:
        'The offset field must be a valid integer greater than or equal to 0',
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
