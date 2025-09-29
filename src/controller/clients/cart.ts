import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const id = req.userId;
  const data = await db.cart.findMany({
    where: { id },
    include: { product: true },
  });

  res.json(data.map((item) => item.product));
};

export const create = async (req: Request, res: Response) => {
  const id = req.userId;
  const { id_product } = req.body;
  const data = await db.cart.create({
    data: { id_client: id, id_product },
    include: { product: true, client: true },
  });
  res.json(data);
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.cart.delete({ where: { id } });
  res.status(204).send("");
};
