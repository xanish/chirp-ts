import { Schema } from 'express-validator';

import isEmailAvailable from '../../validators/is-email-available.js';
import isUsernameAvailable from '../../validators/is-username-available.js';

const RegisterUserSchema: Schema = {
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
    custom: {
      options: isUsernameAvailable,
    },
  },

  password: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The password field is required',
    },
    isLength: {
      options: { min: 6, max: 20 },
      errorMessage:
        'The password field must have length between 6 and 20 characters',
    },
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
    custom: {
      options: isEmailAvailable,
    },
    isLength: {
      options: { min: 6, max: 64 },
      errorMessage:
        'The email field must have length between 6 and 64 characters',
    },
  },

  firstName: {
    in: ['body'],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The first name field is required',
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

export default RegisterUserSchema;
