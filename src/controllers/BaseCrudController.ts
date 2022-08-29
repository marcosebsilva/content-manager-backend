/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/** Base interface to define a CRUD controller, no matter the database */
export default abstract class BaseCrudController {
  /** Handles request to create new assets on the database based on the specified model  */
  static create(_req: Request, _res: Response, _next: NextFunction) {
    throw new Error("Method 'create' must be overwritten");
  }

  /** Handles request to get one specific asset from the specified model  */
  static getOne(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method 'getOne' must be overwritten");
  }

  /** Handles request to get all available assets for the specified model  */
  static getAll(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method 'getAll' must be overwritten");
  }

  /** Handles request to update one specific asset in the  model  */
  static update(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method 'update' must be overwritten");
  }

  /** Handles request to delete one specific asset in the  model */
  static delete(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method 'delete' must be overwritten");
  }
}
