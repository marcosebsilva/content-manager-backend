/* istanbul ignore file */

import InternalError from '../errors/InternalError';
import InvalidIdError from '../errors/InvalidIdFormatError';
import NotFoundError from '../errors/NotFoundError';

/**
* Class used to create subclasses that will execute call directly
* with the database. This is supposed to be a wrapper for any database/orm.
*
* @param T is the shape of the object returned in the queries.
*/
export default abstract class BaseService<T> {
  /**
    * Find all documents that matches a shape in the database.
    *
    * @param obj the shape to query for.
    *
    * @returns A promise that fullfills with the array of documents found.
    */
  public abstract find(obj: Partial<T>): Promise<T[]>;

  /**
    * Find one single document that matches the object shape.
    *
    * @param obj is the shape to query for.
    * @returns A promise that
    * - fullfills with a {@link T} object if document is found;
    * - rejects with {@link NotFoundError} if no document can
    * be found;
    */
  public abstract findOne(obj: Partial<T>): Promise<T | NotFoundError>;

  /**
    * Get all entries in the database.
    *
    * @returns a array of {@link T} documents.
    */
  public abstract getAll(): Promise <T[]>;

  /**
    * Find one single document that matches the identifier.
    *
    * @param id is the unique identifier to query for.
    * @returns A promise that:
    * - fullfills with one single document;
    * - rejects if the {@link id} id has a invalid format;
    * - rejects if id is valid but no document is found on the database;
    */
  public abstract findById(id: string): Promise<T | NotFoundError | InvalidIdError>;

  /**
    * Creates a document inside the database.
    *
    * @param obj the shape of the object to be created.
    * @returns A promise that:
    * - fullfills with the created document.
    * - rejects with {@link BaseError} if anything unexpected wrong.
    */
  public abstract create(obj: T): Promise<T | InternalError>;

  /**
    * Updates the specified document in the database.
    *
    * @param id the identifier of the object to be updated.
    * @param obj the object containing the new values for the document.
    * @returns A promise that:
    * - fullfills with the new/updated {@link T} document.
    * - rejects with {@link NotFoundError} if the document cant be found.
    * - rejects with {@link InvalidIdError} if the {@link id} has a invalid format.
    */
  public abstract update(id: string, obj: Partial<T>): Promise<T | NotFoundError | InvalidIdError>;

  /**
    * Deletes the specified document in the database.
    *
    * @param id the identifier of the object to be deleted.
    * @returns A promise that:
    * - fullfills with nothing if the document is successfully deleted.
    * - rejects with {@link NotFoundError} if the document cant be found.
    * - rejects with {@link InvalidIdError} if the {@link id} has a invalid format.
    */
  public abstract remove(id: string): Promise<void | NotFoundError | InvalidIdError>;
}
