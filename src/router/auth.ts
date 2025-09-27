import express from "express";

import * as auth from "../controller/auth/auth";
import * as user from "../controller/auth/user";

import { authorization } from "../middleware/isAuttenticate";
import {
  changePassword,
  generateCode,
  verifyCode,
  verifyKey,
} from "../controller/auth/recoveryPassword";
import { upload } from "../upload";

export const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

router.post("/send-email", generateCode);
router.post("/key-exists", verifyKey);
router.post("/verify-code", verifyCode);
router.post("/change-password", changePassword);

router
  .route("/user/me")
  .get(authorization, user.getById)
  .patch(authorization, user.update)
  .delete(authorization, user.destroy);

router.post(
  "/user/me/picture",
  authorization,
  upload.single("picture"),
  user.updateImage
);
