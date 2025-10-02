import { NextFunction, Request, Response } from "express";
import { db } from "../database/postgres";

const updateStatusUser = async (id: string) => {
  return await db.user.update({
    where: { id },
    data: {
      status: "ACTIVE",
    },
  });
};

export const updateStatusPerfil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await db.user.findUnique({
    where: { id: req.userId },
    include: { seller: true, client: true },
  });

  const isUserActive = user.status === "ACTIVE";

  if (isUserActive) return next();

  const { store_name, cnpj, description } = user?.seller || {};
  const isSellerRegisterFill = user.name && store_name && cnpj && description;

  const { level_account } = user?.client || {};
  const isClientRegisterFill = user.name && level_account;

  if (isUserActive) return res.json(user);
  else if (isSellerRegisterFill || isClientRegisterFill) {
    const updateData = await updateStatusUser(req.userId);
    return res.json(updateData);
  }
  next();
};
