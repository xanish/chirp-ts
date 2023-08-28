export abstract class BaseError extends Error {
  status: number = 500;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  get name() {
    return this.constructor.name;
  }

  serialize() {
    return {
      statusCode: this.status,
      error: this.name,
      message: this.message,
    };
  }
}
