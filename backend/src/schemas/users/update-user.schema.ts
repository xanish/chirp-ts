import { CustomExpressValidatorSchema } from '../../bootstrap/express-validator.js';

const UpdateUserSchema: CustomExpressValidatorSchema = {
  userId: {
    in: ['params'],
    isUserPresent: true,
  },

  username: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The username field is required',
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        'The username field must have length between 2 and 64 characters',
    },
    isUsernameAvailable: true,
  },

  email: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The email field is required',
    },
    isEmail: {
      errorMessage: 'The email field must be a valid e-mail address',
    },
    isEmailAvailable: true,
    isLength: {
      options: { min: 6, max: 64 },
      errorMessage:
        'The email field must have length between 6 and 64 characters',
    },
  },

  firstName: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        'The first name field must have length between 2 and 64 characters',
    },
  },

  lastName: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        'The last name field must have length between 2 and 64 characters',
    },
  },

  city: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage:
        'The city field must have length between 2 and 100 characters',
    },
  },

  country: {
    in: ['body'],
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        'The country field must have length between 2 and 64 characters',
    },
  },

  birthDate: {
    in: ['body'],
    toDate: true,
    optional: {
      options: { nullable: true },
    },
    isISO8601: {
      errorMessage: 'The birth date field must be a valid date',
    },
    isBefore: {
      options: new Date().toISOString(),
      errorMessage: 'The birth date field cannot have a future date',
    },
  },
};

export default UpdateUserSchema;
