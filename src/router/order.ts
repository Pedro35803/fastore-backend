import express from "express";

import * as order from "../controller/order";
import * as cart from "../controller/clients/cart";
import * as historic from "../controller/clients/history";

import { authorization } from "../middleware/isAuttenticate";
import { verifyClient } from "../middleware/verifyType";

export const router = express.Router();

router
  .route("/orders")
  .get(authorization, verifyClient, order.getAll)
  .post(authorization, verifyClient, order.createForOneProduct);

router.post(
  "/orders/cart",
  authorization,
  verifyClient,
  order.createForCart,
  cart.clear
);

router.get("/history/me", authorization, verifyClient, historic.getAll);
