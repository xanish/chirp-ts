export class ValidationError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: unknown;
  errors: any;

  constructor(error: any) {
    this.name = this.constructor.name;
    this.message = 'Request payload failed validation';
    this.errors = error;
  }
}
