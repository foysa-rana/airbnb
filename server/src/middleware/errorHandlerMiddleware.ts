import { Request, Response, NextFunction } from "express";
const errorHandlerMiddlware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || "There was an error please try again later...",
  };

  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandlerMiddlware;
