import { NextFunction, Request, Response } from "express";

export function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("error", error);
  res.status(400);

  const errorObj = {
    timestamp: new Date(),
    path: req.url,
    fields: error?.fields,
    message: error?.message,
  };

  if (!error) {
    return res
      .status(500)
      .json({ ...errorObj, message: "Unknown server error" });
  }

  if (typeof error?.status === "number") {
    res.status(error.status);
  }

  if (error?.name === "NotFoundError") {
    res.status(404);
  }

  if (error.name?.includes("PrismaClient")) {
    const splitMessage = error.message.split("\n");
    const message = splitMessage.at(-1);

    if (error.code === "P2025" || error.code === "P2016") {
      res.status(404).send(`No ${error.meta.modelName} found`);
    } else if (error.code == "P2002") {
      const fieldsName = error.message?.match(
        /Unique constraint failed on the fields: \(`(.+?)`\)/
      );
      const fields = Object.fromEntries(
        fieldsName?.map((field) => [field, `${field} exists`])
      );
      return res
        .status(409)
        .json({ ...errorObj, fields, message: "field error" });
    }

    res.send(error.meta?.cause || message);
  }

  if (typeof error.message === "string") {
    return res.json({ ...errorObj, message: error.message });
  }

  if (typeof error.inner?.message === "string") {
    return res.json({ ...errorObj, message: error.inner.message });
  }

  return res.json({ ...errorObj, message: "Unknown server error" });
}
