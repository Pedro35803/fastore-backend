import { NextFunction, Request, Response } from "express";
import { db } from "../database/postgres";

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await db.user.findUnique({ where: { id: req.userId } });

  if (!user) throw { message: "User not found", status: 401 };

  if (user.status === "INCOMPLETE")
    throw { message: "Account incomplete for use router", status: 403 };
  else if (user.status !== "ACTIVE")
    throw { message: "Account not allowed use router", status: 403 };

  next();
};
