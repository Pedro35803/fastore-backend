import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../database/postgres";
import { validateEmail, validatePassword } from "../../services/validate";

const objResponse = (user) => {
  return { ...user, password: undefined };
};

export const updateImage = async (req: Request, res: Response) => {
  const id = req.userId;
  const { filename } = req.file;

  const picture = `/images/${filename}`;

  const user = await db.user.update({
    where: { id },
    data: { picture },
  });

  const response = objResponse(user);
  res.status(201).json(response);
};

export const getById = async (req: Request, res: Response) => {
  const id = req.userId;
  const user = await db.user.findUniqueOrThrow({
    where: { id },
  });

  const response = objResponse(user);
  res.json(response);
};

export const update = async (req: Request, res: Response) => {
  const { name, cnpj, storeName, description } = req.body;
  const id = req.userId;
  const where = { id };

  const user = await db.user.findUniqueOrThrow({ where });

  const canUpdateStore =
    user.role === "SELLER" && (cnpj || storeName || description);

  const dataUpdate = { id_user: id, cnpj, storeName, description };
  const update = canUpdateStore
    ? {
        seller: {
          create: dataUpdate,
          update: { data: dataUpdate, where: { id_user: id } },
        },
      }
    : {};

  const data = await db.user.update({
    data: { name, ...update },
    where,
  });

  const response = objResponse(data);
  res.status(203).json(response);
};

export const updatePassword = async (req: Request, res: Response) => {
  const { password } = req.params;
  const id = req.userId;
  const where = { id };

  validatePassword(password);

  const data = await db.user.update({
    data: {
      password: await bcrypt.hash(password, 10),
    },
    where,
  });

  const response = objResponse(data);
  res.status(203).json(response);
};

export const destroy = async (req: Request, res: Response) => {
  const id = req.userId;
  const filter = { where: { id } };
  await db.user.findUniqueOrThrow(filter);
  const user = await db.user.delete(filter);
  res.status(204).json(user);
};
