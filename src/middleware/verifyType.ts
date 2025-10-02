import { NextFunction, Request, Response } from "express";

export const verifyClient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userType !== "CLIENT")
    throw { message: "router for client use", status: 401 };
  next();
};
