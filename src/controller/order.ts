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

export const createForOneProduct = async (req: Request, res: Response) => {
  const { id_product, quantity } = req.body;
  const amount = quantity || 1;

  const product = await db.product.findUniqueOrThrow({
    where: { id: id_product },
  });

  const order = await db.order.create({
    data: {
      id_client: req.userId,
      total_price: product.price * amount,
      status: "COMPLETED",
    },
  });

  const orderItems = await db.order_Item.createManyAndReturn({
    data: {
      id_order: order.id,
      product_id: product.id,
      price: product.price,
      quantity: amount,
    },
  });

  res.json({ ...order, items: orderItems });
};

export const createForCart = async (req: Request, res: Response) => {
  const id_client = req.userId;

  const cartItem = await db.cart.findMany({
    where: { id_client },
    include: { product: true },
  });

  if (cartItem.length < 1) {
    throw {
      message: "No items in the cart, no order was created.",
      modal: "No items in the cart",
    };
  }

  const total_price = cartItem.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: { id_client, total_price, status: "COMPLETED" },
  });

  const orderItems = await db.order_Item.createManyAndReturn({
    data: cartItem.map((item) => ({
      id_order: order.id,
      product_id: item.product.id,
      price: item.product.price,
      quantity: item.quantity,
    })),
  });

  await db.cart.deleteMany({ where: { id_client: req.userId } });

  res.json({ ...order, items: orderItems });
};
