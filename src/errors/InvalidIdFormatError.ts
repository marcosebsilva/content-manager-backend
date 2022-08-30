import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when path param @postId from a request is not a valid */
export default class InvalidIdFormatError extends BaseError {
  constructor() {
    super('Invalid id format.', 'InvalidIdFormat', StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
