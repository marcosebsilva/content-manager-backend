import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/**Throwable error used when the resource requested can't be found. */
export default class InvalidObjectIdError extends BaseError {
  constructor() {
    super("InvalidObjectIdError", "Invalid id format.", StatusCodes.UNPROCESSABLE_ENTITY);
  }
}