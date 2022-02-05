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

// Get family account by ID - FULL
router.get("/:id/full",raw(C.getFamilyAccountByIdFull));

// Get family account by ID - SHORT
router.get("/:id/short", raw(C.getFamilyAccountByIdShort));

// Add individuals to family account
router.post("/:family_id", raw(C.addIndividualsToFamily));

// Delete individuals from family account
router.put("/:family_id", raw(C.deleteIndividualsFromFamily));

// Transfer F2B
router.post("/transfer", raw(C.transferFromFamilyToBusiness));

// Close family account by ID
router.put("/close/:id", raw(C.closeFamilyAccountById));

export default router;
