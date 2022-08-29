import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

/** Throwable error used when path param @postId from a request is not a valid {@link ObjectId} */
export default class InvalidObjectIdError extends BaseError {
  constructor() {
    super('InvalidObjectIdError', 'Invalid id format.', StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
