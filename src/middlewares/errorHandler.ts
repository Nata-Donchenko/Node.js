import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: unknown, req: Request, res: Response, next:NextFunction ) => {
  if (err instanceof Error) {
    if (err.name === "CastError") {
      return res.status(400).send(err.message);
    }
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    }
  }

  return res.status(500).send( 'Something went wrong!');
}