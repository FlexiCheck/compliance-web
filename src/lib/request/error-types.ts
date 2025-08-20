/* eslint-disable @typescript-eslint/no-explicit-any */
type RequestErrorTypes = 'client' | 'server' | 'decode_error' | 'network';

export class RequestError extends Error {
  type: RequestErrorTypes;
  errors?: any;
  status?: number;
  constructor({
    type,
    message,
    errors,
    status,
  }: {
    type: RequestErrorTypes;
    message: string;
    name?: string;
    errors?: any;
    status?: number;
  }) {
    super(message);
    this.type = type;
    this.errors = errors;
    this.status = status;
  }
}

export function requestError(args: {
  type: RequestErrorTypes;
  message: string;
  errors?: any;
  status?: number;
}) {
  return new RequestError(args);
}
