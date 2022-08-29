import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import clearValidationErrors from '../utils/clearValidationErrors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (error: any, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof Error.ValidationError) {
    const errors = clearValidationErrors(error);
    res.status(StatusCodes.BAD_REQUEST).json({ errors });
    return;
  }

  try {
    res.status(error.status).json({ message: error.message });
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'A internal error occurred.' });
  }
}
