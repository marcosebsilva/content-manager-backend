import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when the resource requested can't be found. */
export default class InternalError extends BaseError {
  constructor(message: string = 'A internal error ocurred.') {
    super('Internal Error', message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
