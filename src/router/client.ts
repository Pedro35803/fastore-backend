import express from "express";

import * as cart from "../controller/clients/cart";

import { authorization } from "../middleware/isAuttenticate";

export const router = express.Router();

router
  .route("/cart/me")
  .get(authorization, cart.getAll)
  .post(authorization, cart.create)
  .delete(authorization, cart.destroy);
