import { Request, Response } from "express";
import { db } from "../../database/postgres";

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await db.client.findUniqueOrThrow({ where: { id_user: id } });
  res.json(data);
};

export const destroy = async (req: Request, res: Response) => {
  await db.user.update({
    where: { id: req.userId },
    data: { status: "DELETED" },
  });
  res.status(204).send("");
};
