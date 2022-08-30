import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when the resource requested can't be found. */
export default class NotFoundError extends BaseError {
  constructor(message: string = 'Asset not found.') {
    super(message, 'NotFoundError', StatusCodes.NOT_FOUND);
  }
}
