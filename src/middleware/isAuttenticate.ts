import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../env";
import { db } from "../database/postgres";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) throw { status: 401, message: "Token is required" };

  const listString = bearerToken.split(" ");
  const token = listString[1];

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) throw { status: 401, message: "Unauthorized access" };

  req.userId = decoded.sub as string;

  const user = await db.user.findUniqueOrThrow({ where: { id: req.userId } });
  if (user.status === "DELETED")
    throw {
      message: "User account has been deleted and cannot be accessed",
      status: 410,
    };

  req.userType = user.role;
  req.userStatus = user.status;

  next();
};
