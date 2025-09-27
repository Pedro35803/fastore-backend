import express from "express";

import * as statistics from "../controller/sellers/dashboard";

import { authorization } from "../middleware/isAuttenticate";

export const router = express.Router();

router.get("/seller/dashboard", authorization, statistics.dashboardSeller);
