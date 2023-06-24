import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const response: any = {};
  for (let error of errors.array()) {
    if ('path' in error) {
      if (error.path in response) {
        response[error.path]['messages'].push(error.msg);
      } else {
        response[error.path] = {
          type: error.type,
          location: error.location,
          value: error.value,
          messages: [error.msg],
        };
      }
    } else {
      // catch-all block in case validation errors are not of type FieldValidationError
      if ('others' in response) {
        response['others'].push(error.msg);
      } else {
        response['others'] = [error.msg];
      }
    }
  }

  return res.status(422).json(response);
};

export default validateRequest;
