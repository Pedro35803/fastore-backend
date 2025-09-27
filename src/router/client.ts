import express from "express";

import * as cart from "../controller/clients/cart";

import { authorization } from "../middleware/isAuttenticate";

export const router = express.Router();

router.get("/client/cart", authorization, cart.getAll);
