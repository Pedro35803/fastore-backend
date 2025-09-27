import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { db } from "../../database/postgres";
import { sendCodeEmail } from "../../services/email";
import { generateNumber } from "../../services/numbers";
import { redis } from "../../database/redis";
import { User } from "@prisma/client";

const redisKeyCode = "code-recovery-password";
const redisKeyChangePassword = "code-recovery-password";

export const generateCode = async (req: Request, res: Response) => {
  const { email } = req.body as Partial<User>;
  const { id } = await db.user.findUnique({ where: { email } });
  const hash = await bcrypt.hash(id, 10);

  const code = generateNumber(6);
  await sendCodeEmail(email, code);

  await redis.set(
    `${redisKeyCode}-${hash}`,
    JSON.stringify({ key: hash, code, email }),
    {
      EX: 3600,
    }
  );

  res.status(200).json({ key: hash });
};

export const verifyCode = async (req: Request, res: Response) => {
  const { key, code } = req.body;
  const redisKey = `${redisKeyCode}-${key}`;
  const cache = await redis.get(redisKey);
  const jsonCode = JSON.parse(cache);

  if (!jsonCode) throw { status: 404, message: "Key not exists" };
  if (jsonCode?.code != code) throw { status: 401, message: "Code incorrect" };

  const { id: id_user } = await db.user.findUnique({
    where: { email: jsonCode.email },
  });

  await redis.del(redisKey);

  if (!id_user) throw { status: 410, message: "Recovery password cancel" };

  const hash = await bcrypt.hash(id_user, 10);

  await redis.set(
    `${redisKeyChangePassword}-${hash}`,
    JSON.stringify({ key: hash, email: jsonCode.email }),
    {
      EX: 3600,
    }
  );

  res.json({ key: hash });
};

export const changePassword = async (req: Request, res: Response) => {
  const { key, password } = req.body;
  const redisKey = `${redisKeyChangePassword}-${key}`;
  const cache = await redis.get(redisKey);
  const jsonCode = JSON.parse(cache);

  if (!jsonCode) throw { message: "Key not exists" };

  const user: User = await db.user.findUnique({
    where: { email: jsonCode.email },
  });

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (isPasswordEqual) throw { message: "Password same as current" };

  await redis.del(redisKey);

  const newPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    data: { password: newPassword },
    where: { id: user.id },
  });

  res.status(203).send("Update password whit success");
};

export const verifyKey = async (req: Request, res: Response) => {
  const { key } = req.body;

  if (!key) throw { status: 404, message: "Require key params" };

  const dataCode = await redis.get(`${redisKeyCode}-${key}`);
  const dataPass = await redis.get(`${redisKeyChangePassword}-${key}`);
  if (!dataCode && !dataPass) throw { status: 404, message: "Key not exists" };

  res.send({ verifyCode: !!dataCode, chagePass: !!dataPass });
};
