import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../database/postgres";
import { validateEmail, validatePassword } from "../../services/validate";
import { BASE_URL } from "../../env";

const objResponse = (user) => {
  return { ...user, password: undefined };
};

const regexVerifyImgExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)$/;
const regexVerifyScriptsExtensions =
  /\.(php[0-9]?|pht|phtml|phar|asp[x]?|jsp|cfm|cgi|exe|sh|bat|cmd|com|scr|js|vbs|wsf|ps1)/;

export const updateImage = async (req: Request, res: Response) => {
  const id = req.userId;
  const { filename } = req.file;

  const containMaliciousExtension = regexVerifyScriptsExtensions.test(filename);
  const containImageExtension = regexVerifyImgExtensions.test(filename);

  if (containMaliciousExtension)
    throw { message: "script file not allowed", status: 406 };
  else if (!containImageExtension)
    throw { message: "extension not allowed", status: 406 };

  const picture = BASE_URL + `/images/${filename}`;

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
    include: { seller: true, client: true },
  });

  const response = objResponse(user);
  res.json(response);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, cnpj, store_name, description } = req.body;
  const id = req.userId;
  const where = { id };

  const user = await db.user.findUniqueOrThrow({ where });

  const canUpdateStore =
    user.role === "SELLER" && (cnpj || store_name || description);

  const dataUpdate = { cnpj, store_name, description };
  const update = canUpdateStore
    ? {
        seller: {
          upsert: {
            create: dataUpdate,
            update: dataUpdate,
          },
        },
      }
    : {};

  const data = await db.user.update({
    data: { name, ...update },
    where,
  });

  const response = objResponse(data);
  res.status(203).json(response);
  next();
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
