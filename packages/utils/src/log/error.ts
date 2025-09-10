export class UserException extends Error {
  constructor(message: string, option: { name: string; cause: string }) {
    super(message, option);
    this.name = option.name;
    this.cause = option.cause;
    this.message = message;
  }
}
