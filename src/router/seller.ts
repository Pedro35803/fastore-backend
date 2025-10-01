import express from "express";

import * as statistics from "../controller/sellers/dashboard";
import * as products from "../controller/sellers/product";
import * as stores from "../controller/sellers/stores";

import { authorization } from "../middleware/isAuttenticate";
import { verifyAccount } from "../middleware/verifyActiveAccount";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const router = express.Router();

router.get("/dashboard", authorization, statistics.dashboardSeller);

router
  .route("/products")
  .post(authorization, verifyAccount, products.create)
  .patch(authorization, verifyAccount, products.update)
  .get(products.getAll);

router.post(
  "/products/csv",
  upload.single("file"),
  authorization,
  verifyAccount,
  products.createForCSV
);

router
  .route("/products/:id")
  .patch(authorization, verifyAccount, products.update)
  .delete(authorization, verifyAccount, products.destroy)
  .get(products.getById);

router.get("/stores", stores.getAll);
router.get("/stores/:id", stores.getById);

router.get("/products/store/:id", products.getAllByStore);
router.get("/store/:id/products", products.getAllByStore);
