/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./business.controller.js";
import express from 'express';
import { changeAccountStatus } from "../individual/individual.controller.js";
import * as BMiddleware from '../../middleware/buisnessMiddle.js';
import { changeStatusMiddle } from "../../middleware/changeStatusMiddle.js";

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create an business account
router.post("/",raw(BMiddleware.createBuisnessMiddle),  raw(C.createBusinessAccount));
  
// Get business account by ID
router.get("/:id",raw(BMiddleware.getBuisnessMiddle), raw(C.getBusinessAccountById));

// Transfer B2B/B2I (same currency)
router.post("/transfer/same-currency",raw(BMiddleware.transferBuisnessSameCurMiddle), raw(C.transferFromBusinessSameCurrency));

// Transfer B2B (different currency)
router.post("/transfer/different-currency",raw(BMiddleware.transferBuisnessDiffCurMiddle), raw(C.transferFromBusinessDifferentCurrency));

// Activate/Deactivate accounts - uses the individual controller
router.put("/change-status", raw(changeStatusMiddle), raw(changeAccountStatus));
  
export default router;
