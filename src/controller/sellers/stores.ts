import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const take = Number(limit) || undefined;
  const skip = take * page || undefined;
  const stores = await db.seller.findMany({
    take,
    skip,
    include: { user: true },
  });
  res.json(stores);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const store = await db.seller.findUniqueOrThrow({
    where: { id_user: id },
    include: { product: true, user: true },
  });
  res.json(store);
};
