import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const id = req.userId;
  const data = await db.favorites.findMany({
    where: { id_client: id },
    include: { product: { include: { cart: true } } },
  });

  res.json(
    data.map((item) => ({
      ...item.product,
      cart: undefined,
      containInCart: item.product.cart.some((cart) => cart.id_client === id),
    }))
  );
};

export const create = async (req: Request, res: Response) => {
  const id = req.userId;
  const { id_product } = req.body;
  const data = await db.favorites.create({
    data: { id_client: id, id_product },
    include: { product: true, client: true },
  });
  res.json(data);
};

export const destroy = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  await db.favorites.delete({
    where: {
      id_product_id_client: {
        id_client: req.userId,
        id_product: productId,
      },
    },
  });
  res.status(204).send("");
};
