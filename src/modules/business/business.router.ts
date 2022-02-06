/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./business.controller.js";
import express from 'express';

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create an business account
router.post("/",  raw(C.createBusinessAccount));
  
// Get business account by ID
router.get("/:id",raw(C.getBusinessAccountById));

// Transfer B2B/B2I (same currency)
router.post("/transfer/same-currency",raw(C.transferFromBusinessSameCurrency));

// Transfer B2B/B2I (different currency)
router.post("/transfer/different-currency",raw(C.transferFromBusinessDifferentCurrency));


  
export default router;
