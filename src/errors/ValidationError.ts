import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when the request body validation fails */
export default class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'ValidationError', StatusCodes.BAD_REQUEST);
  }
}
