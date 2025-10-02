import express from "express";

import * as statistics from "../controller/sellers/dashboard";
import * as products from "../controller/sellers/product";
import * as stores from "../controller/sellers/stores";
import * as seller from "../controller/sellers/seller";

import { authorization } from "../middleware/isAuttenticate";
import { verifyAccountSeller } from "../middleware/verifyActiveAccount";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const router = express.Router();

router.get("/dashboard", authorization, statistics.dashboardSeller);

router
  .route("/products")
  .post(authorization, verifyAccountSeller, products.create)
  .patch(authorization, verifyAccountSeller, products.update)
  .get(products.getAll);

router.post(
  "/products/csv",
  upload.single("file"),
  authorization,
  verifyAccountSeller,
  products.createForCSV
);

router
  .route("/products/:id")
  .patch(authorization, verifyAccountSeller, products.update)
  .delete(authorization, verifyAccountSeller, products.destroy)
  .get(products.getById);

router.get("/stores", stores.getAll);
router.get("/stores/:id", stores.getById);

router.patch("/seller/inactive", authorization, seller.inactiveSeller);
router.patch("/seller/active", authorization, seller.activeSeller);
