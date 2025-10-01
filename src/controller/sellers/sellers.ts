import { NextFunction, Request, Response } from "express";
import { db } from "../../database/postgres";

export const verifyStatusPerfil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await db.user.findUnique({
    where: { id: req.userId },
    include: { seller: true },
  });

  if (user.role !== "SELLER") return next();

  const { store_name, cnpj, description, store_active } = user.seller;
  if (user.status === "ACTIVE" && store_active) return res.json(user);
  else if (user.name && store_name && cnpj && description) {
    const updateData = await db.user.update({
      where: { id: user.id },
      data: {
        status: "ACTIVE",
        seller: {
          update: { where: { id_user: user.id }, data: { store_active: true } },
        },
      },
    });
    return res.json(updateData);
  }
  next();
};
