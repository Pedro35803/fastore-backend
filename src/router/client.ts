import express from "express";

import * as cart from "../controller/clients/cart";
import * as favorites from "../controller/clients/favorite";

import { authorization } from "../middleware/isAuttenticate";
import { verifyClient } from "../middleware/verifyType";

export const router = express.Router();

const generateRouters = (name: string, controller: any) => {
  router
    .route(`/${name}/me`)
    .get(authorization, verifyClient, controller.getAll)
    .post(authorization, verifyClient, controller.create);

  router.delete(
    `/${name}/:id`,
    authorization,
    verifyClient,
    controller.destroy
  );
};

generateRouters("cart", cart);
generateRouters("favorite", favorites);

