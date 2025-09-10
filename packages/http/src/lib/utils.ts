export class UserException extends Error {
  constructor(message: string, option: { name: string; cause: string }) {
    super(message, { cause: option.cause });
    this.name = option.name;
    this.message = message;
  }
}

export class ApiError extends Error {
  constructor(message: string, { status, context }: { status: number; context: any }) {
    super(message);
    this.name = status.toString();
    this.cause = context;
  }
}

// class StandardApiError extends Error {
//   constructor({ code, message, status, requestId, timestamp }: { code: string; message: string; status: number; requestId: string; timestamp: string }) {
//     super(message);
//     this.name = 'StandardApiError';
//     this.code = code;
//     this.status = status;
//     this.requestId = requestId;
//     this.timestamp = timestamp;
//   }
// }
