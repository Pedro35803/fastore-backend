import express from "express";

import * as statistics from "../controller/sellers/dashboard";
import * as products from "../controller/sellers/product";

import { authorization } from "../middleware/isAuttenticate";

export const router = express.Router();

router.get("/seller/dashboard", authorization, statistics.dashboardSeller);

router
  .route("/product")
  .post(authorization, products.create)
  .patch(authorization, products.update)
  .get(products.getAll);

router
  .route("/product/:id")
  .patch(authorization, products.update)
  .delete(authorization, products.destroy)
  .get(products.getById);

router.get("/product/store/:id", products.getAllByStore);
router.get("/store/:id/products", products.getAllByStore);
