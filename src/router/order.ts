import express from "express";

import * as order from "../controller/orders/order";

import { authorization } from "../middleware/isAuttenticate";

export const router = express.Router();

router.get("/orders", authorization, order.getAll);
