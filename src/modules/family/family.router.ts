/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./family.controller.js";
import express from 'express';

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create family account
router.post("/",  raw(C.createFamilyAccount));

// Get family account by ID - FULL/SHORT
router.get("/:id/:details_level",raw(C.getFamilyAccountById));

// Add individuals to family account - return FULL/SHORT
router.post("/:family_id/:details_level", raw(C.addIndividualsToFamily));

// Delete individuals from family account - return FULL/SHORT
router.put("/:family_id/:details_level", raw(C.deleteIndividualsFromFamily));

// Transfer F2B
router.post("/transfer", raw(C.transferFromFamilyToBusiness));

// Close family account by ID
router.put("/close/:id", raw(C.closeFamilyAccountById));

export default router;
