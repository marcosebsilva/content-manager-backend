import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from 'mongoose';
import clearValidationErrors from "../utils/clearValidationErrors";

export default function (error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof Error.ValidationError){
    const errors = clearValidationErrors(error);
    res.status(StatusCodes.BAD_REQUEST).json({ errors });
    return;
  }

  res.status(error.status).json({message: error.message});
}