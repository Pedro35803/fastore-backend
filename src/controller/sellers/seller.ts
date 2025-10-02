import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const activeSeller = async (req: Request, res: Response) => {
  await db.seller.update({
    where: { id_user: req.userId },
    data: { store_active: true },
  });
  res.status(204).send("");
};

export const inactiveSeller = async (req: Request, res: Response) => {
  await db.seller.update({
    where: { id_user: req.userId },
    data: { store_active: false },
  });
  res.status(204).send("");
};
