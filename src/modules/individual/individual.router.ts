/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./individual.controller.js";
import express from 'express';

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create an individual account
router.post("/", raw(C.createIndividualAccount));
  
// Get individual account by ID
router.get("/:id",raw(C.getIndividualAccountById));

// Activate/Deactivate account by ID
router.put("/change-status/:id", raw(C.changeAccountStatus));
  
export default router;