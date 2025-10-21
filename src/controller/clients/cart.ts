import { NextFunction, Request, Response } from "express";
import { db } from "../../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const id = req.userId;
  const data = await db.cart.findMany({
    where: { id_client: id },
    include: { product: { include: { favorites: true } } },
  });

  const total_price = data.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  res.json({
    total_price,
    cart: data.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: item.product,
      isFavorite: item.product.favorites.some((fav) => fav.id_client === id),
    })),
  });
};

export const create = async (req: Request, res: Response) => {
  const id_client = req.userId;
  const { id_product } = req.body;
  const data = await db.cart.create({
    data: { id_client, id_product },
    include: { product: true, client: true },
  });
  res.status(201).json(data);
};

export const destroy = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  await db.cart.delete({
    where: {
      id_product_id_client: {
        id_client: req.userId,
        id_product: productId,
      },
    },
  });
  res.status(204).send("");
};

export const clear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await db.cart.deleteMany({ where: { id_client: req.userId } });
  next();
};
