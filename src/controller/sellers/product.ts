import { Request, Response } from "express";
import { db } from "../../database/postgres";
import { Product } from "@prisma/client";

export const getAll = async (req: Request, res: Response) => {
  const data = await db.product.findMany();
  res.json(data);
};

export const getAllByStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await db.product.findMany({ where: { id_seller: id } });
  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await db.product.findMany({ where: { id } });
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const id = req.userId;
  const data = await db.product.create({
    data: { ...req.body, id_seller: id },
  });
  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, picture, price } = req.body as Product;
  const data = await db.product.update({
    where: { id },
    data: { name, description, picture, price },
  });
  res.status(203).json(data);
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.product.delete({ where: { id } });
  res.status(204).send("");
};
