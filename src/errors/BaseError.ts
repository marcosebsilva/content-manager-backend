import { StatusCodes } from "http-status-codes";
/**Abstract class used to create Errors that will be throwed inside de controllers.*/
export default abstract class BaseError extends Error {
  /**http status code to be sent to the client @see {@link StatusCodes} */
  public status: number;

  constructor(
    /**Custom name identifier */
    name: string,
    message: string,
    status: number
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }
}