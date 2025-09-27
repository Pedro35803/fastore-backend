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
  const { email, name, password, ...userData } = req.body;
  const id = req.userId;
  const where = { id };

  await db.user.findUniqueOrThrow({ where });

  email && validateEmail(email);
  password && validatePassword(password);

  const update = {
    password: password ? await bcrypt.hash(password, 10) : undefined,
    email,
    name,
  };

  const user = await db.user.update({
    data: {
      ...userData,
      userLogged: { update: { data: { ...update }, where: { id_user: id } } },
    },
    where,
  });

  const response = objResponse(user);
  res.status(203).json(response);
};

export const destroy = async (req: Request, res: Response) => {
  const id = req.userId;
  const filter = { where: { id } };
  await db.user.findUniqueOrThrow(filter);
  const user = await db.user.delete(filter);
  res.status(204).json(user);
};
