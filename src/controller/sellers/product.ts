import { Request, Response } from "express";
import { db } from "../../database/postgres";
import { Product } from "@prisma/client";
import { readCsv } from "../../services/csv";

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

export const createForCSV = async (req: Request, res: Response) => {
  const { name_field, price_field, description_field, picture_field } =
    req.body;

  if (!name_field && !price_field && !description_field && !picture_field)
    throw { message: "Missing field for remap CSV" };
  if (!req.file) throw { message: "File is required" };

  const listProducts = await readCsv(req.file);
  const listRemap = listProducts.map((product) => ({
    id_seller: req.userId,
    name: product[name_field],
    price: Number(product[price_field]),
    picture: product[picture_field],
    description: product[description_field],
  }));

  await db.product.createMany({ data: listRemap });
  res.status(201).json(listRemap);
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
