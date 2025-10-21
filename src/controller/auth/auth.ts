import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { validateEmail, validatePassword } from "../../services/validate";
import { BASE_URL, JWT_SECRET } from "../../env";
import { db } from "../../database/postgres";

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  validateEmail(email);
  // validatePassword(password);

  const hashPassword = await bcrypt.hash(password, 10);

  const secondTable = role === "CLIENT" ? { client: { create: {} } } : {};

  const data = {
    password: hashPassword,
    picture: `${BASE_URL}/images/common.png`,
    email,
    role,
    ...secondTable,
  };

  const user = await db.user.create({ data });

  res.status(201).json({ ...user, password: undefined });
};

const throwError422 = (field: string) => {
  throw { status: 422, fields: { [field]: `Argument '${field}' is missing` } };
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const msg401 = "email or password incorrect";
  const objError = { status: 401, fields: { email: msg401, password: msg401 } };

  if (!email) throwError422("email");
  if (!password) throwError422("password");

  const user = await db.user.findUnique({ where: { email } });

  if (!user) throw objError;

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) throw objError;

  const token = jwt.sign({ sub: user.id, type: user.role }, JWT_SECRET, {
    algorithm: "HS256",
  });

  res.status(201).json({ token });
};
