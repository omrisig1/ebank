/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./business.controller.js";
import express from 'express';
import * as BMiddleware from '../../middleware/buisnessMiddle.js';
import { black_list_Middleware } from "../../middleware/black_list.middleware.js";
import { account_type } from "../../types/types.js";
const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create an business account
router.post("/", raw(BMiddleware.createBuisnessMiddle),  raw(C.createBusinessAccount));
  
// Get business account by ID
router.get("/:id",raw(BMiddleware.getBuisnessMiddle), raw(C.getBusinessAccountById));

// Transfer B2B/B2I (same currency)
router.post("/transfer/same-currency",raw(black_list_Middleware(account_type.BUSINESS)), raw(BMiddleware.transferBuisnessSameCurMiddle), raw(C.transferFromBusinessSameCurrency));

// Transfer B2B (different currency)
router.post("/transfer/different-currency",raw(BMiddleware.transferBuisnessDiffCurMiddle), raw(C.transferFromBusinessDifferentCurrency));
  
export default router;
