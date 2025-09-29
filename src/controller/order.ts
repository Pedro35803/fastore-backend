import { Request, Response } from "express";
import { db } from "../database/postgres";

export const getAll = async (req: Request, res: Response) => {
  const id = req.userId;

  const data = await db.order.findMany({
    where: { id_client: id },
    include: { orderItem: { include: { product: true } } },
  });

  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const { id_client, products } = req.body;

  if (!id_client || !Array.isArray(products) || products.length === 0) {
    throw { message: "Client and product is required" };
  }

  const total_price = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: { id_client, total_price, status: "COMPLETED" },
  });

  const orderItems = await db.order_Item.createManyAndReturn({
    data: products.map((item) => ({
      id_order: order.id,
      product_id: item.id,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  res.json({ ...order, items: orderItems });
};
