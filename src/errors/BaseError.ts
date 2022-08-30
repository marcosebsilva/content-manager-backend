/**
* Abstract class used to create Errors that will be throwed inside de models.
*/
export default abstract class BaseError extends Error {
  public status: number;

  /**
   * @param message A text with a more detailed explanation of the error.
   * @param name Custom name identifier for the error.
   * @param status HTTP Status Code according to the error.
   */
  constructor(
    message: string,
    name: string,
    status: number,
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }
}
