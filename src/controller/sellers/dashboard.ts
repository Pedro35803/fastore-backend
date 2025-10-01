import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const dashboardSeller = async (req: Request, res: Response) => {
  const id_seller = req.userId;

  const products = await db.product.findMany({
    where: { id_seller },
    include: { orderItem: true },
  });

  const totalRevenue = products.reduce(
    (acc, product) =>
      product.orderItem.reduce(
        (accItem, orderItem) => Number(orderItem.price) + accItem,
        0
      ) + acc,
    0
  );

  const totalProductsSold = products.reduce(
    (acc, product) => product.orderItem.length + acc,
    0
  );

  const bestSellingProduct = products.reduce(
    (acc, product) =>
      product.orderItem.length > acc.amount
        ? { name: product.name, amount: product.orderItem.length }
        : acc,
    { name: "", amount: 0 }
  );

  res.json({
    totalRevenue,
    totalProductsSold,
    totalProducts: products.length,
    bestSellingProduct: bestSellingProduct.name,
  });
};
