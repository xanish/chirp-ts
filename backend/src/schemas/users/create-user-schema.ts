import { Schema } from 'express-validator';

const CreateUserSchema: Schema = {
  username: {
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
  },

  email: {
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: 'The email field is required',
    },
    isEmail: {
      errorMessage: 'The email field must be a valid e-mail address',
    },
    isLength: {
      options: { min: 6, max: 64 },
      errorMessage:
        'The email field must have length between 6 and 64 characters',
    },
  },

  firstName: {
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
    optional: {
      options: { nullable: true },
    },
    isDate: {
      errorMessage: 'The birth date field must be a valid date',
    },
  },
};

export default CreateUserSchema;
