import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (error: any, req: Request, res: Response, _next: NextFunction) {
  res.status(error.status).json({ message: error.message });
}
