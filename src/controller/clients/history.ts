import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const id = req.userId;
  const data = await db.order.findMany({
    where: { id_client: id },
    include: { orderItem: { include: { product: true } } },
  });

  res.json(data);
};
