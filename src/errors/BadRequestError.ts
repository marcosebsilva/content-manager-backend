import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when a request param is not valid */
export default class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 'BadRequestError', StatusCodes.BAD_REQUEST);
  }
}
