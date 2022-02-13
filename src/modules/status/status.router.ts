/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import express from 'express';
import { changeStatusMiddle } from "../../middleware/changeStatusMiddle.js";
import * as C from "./status.controller.js";

const router = express.Router();

// Parse json req.body on post routes
router.use(express.json())


// Activate/Deactivate accounts - uses the individual controller
router.put("/change-status", raw(changeStatusMiddle), raw(C.changeAccountStatus));

export default router;
