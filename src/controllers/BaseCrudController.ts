import { Request, Response, NextFunction } from 'express';

/**Base interface to define a CRUD controller, no matter the database */
export default interface BaseCrudController<T> {
  /**Handles request to create new assets on the database based on the specified model {@link T} */
  create: (req: Request , res: Response, next: NextFunction) => void

  /**Handles request to get one specific asset from the specified model {@link T} */
  getOne: (req: Request , res: Response, next: NextFunction) => void

  /**Handles request to get all available assets for the specified model {@link T} */
  getAll: (req: Request , res: Response, next: NextFunction) => void

  /**Handles request to update one specific asset in the {@link T} model  */
  update: (req: Request , res: Response, next: NextFunction) => void

  /** Handles request to delete one specific asset in the {@link T} model */
  delete: (req: Request , res: Response, next: NextFunction) => void
}