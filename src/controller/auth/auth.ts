import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { validateEmail, validatePassword } from "../../services/validate";
import { JWT_SECRET } from "../../env";
import { db } from "../../database/postgres";

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  validateEmail(email);
  // validatePassword(password);

  const hashPassword = await bcrypt.hash(password, 10);

  const data = {
    password: hashPassword,
    email,
    role,
  };

  const user = await db.user.create({ data });

  res.status(201).json({ ...user, password: undefined });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const objError = { status: 401, message: "email or password incorrect" };

  if (!email) throw new Error("Argument `email` is missing");
  if (!password) throw new Error("Argument `password` is missing");

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) throw objError;

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) throw objError;

  const token = jwt.sign({ sub: user.id, type: user.role }, JWT_SECRET, {
    algorithm: "HS256",
  });

  res.status(201).json({ token });
};
