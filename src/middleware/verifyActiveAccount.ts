import { NextFunction, Request, Response } from "express";
import { db } from "../database/postgres";

export const verifyAccountSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await db.user.findUnique({
    where: { id: req.userId },
    include: { seller: true },
  });

  if (!user) throw { message: "User not found", status: 401 };

  if (!user.seller.store_active)
    throw { message: "Store not active", status: 403 };
  else if (user.status === "INCOMPLETE")
    throw { message: "Account incomplete for use router", status: 403 };
  else if (user.status !== "ACTIVE")
    throw { message: "Account not allowed use router", status: 403 };

  next();
};
