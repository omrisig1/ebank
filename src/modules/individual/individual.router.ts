/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import * as C from "./individual.controller.js";
import express from 'express';
import * as IMiddleware from '../../middleware/individualMiddle.js';
import { black_list_Middleware } from "../../middleware/black_list.middleware.js";
import * as T from "../../types/types.js";
import { changeStatusMiddle } from "../../middleware/changeStatusMiddle.js";

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())

// Create an individual account
router.post("/", raw(IMiddleware.createIndividualMiddle) ,raw(C.createIndividualAccount));
  
// Get individual account by ID
router.get("/:id",raw(IMiddleware.getIndividualMiddle), raw(C.getIndividualAccountByAccountId));

// Activate/Deactivate accounts
router.put('/change-status', raw(changeStatusMiddle), raw(C.changeAccountStatus));

// Transfer F2B
router.post("/transfer",raw(black_list_Middleware(T.account_type.INDIVIDUAL)),raw(IMiddleware.transferIndividualMiddle), raw(C.transferFromOwnerToFamily));
  
export default router;
