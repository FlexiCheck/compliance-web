/* eslint-disable @typescript-eslint/no-explicit-any */
type RequestErrorTypes = 'client' | 'server' | 'decode_error' | 'network';

export class RequestError extends Error {
  type: RequestErrorTypes;
  errors?: any;
  constructor({
    type,
    message,
    errors,
  }: {
    type: RequestErrorTypes;
    message: string;
    name?: string;
    errors?: any;
  }) {
    super(message);
    this.type = type;
    this.errors = errors;
  }
}

export function requestError(args: { type: RequestErrorTypes; message: string; errors?: any }) {
  return new RequestError(args);
}
