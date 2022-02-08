// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-misused-promises */
// import raw from "../../middleware/route.async.wrapper.js";
// import * as C from "./family.controller.js";
// import express from 'express';
// import * as FMiddleware from '../../middleware/familyMiddle.js';

// const router = express.Router();

// // Parse json req.body on post routes
// router.use(express.json())

// // Create family account
// router.post("/",raw(FMiddleware.createFamilyMiddle), raw(C.createFamilyAccount));

// // // Get family account by ID - FULL/SHORT
// // router.get("/:id/:details_level",raw(FMiddleware.getFamilyMiddle), raw(C.getFamilyAccountById));

// // // Add individuals to family account - return FULL/SHORT
// // router.post("/add/:family_id/:details_level",raw(FMiddleware.addIndividualToFamilyMiddle), raw(C.addIndividualsToFamily));

// // // Delete individuals from family account - return FULL/SHORT
// // router.put("/remove/:family_id/:details_level",raw(FMiddleware.removeIndividualFromFamilyMiddle), raw(C.deleteIndividualsFromFamily));

// // // Transfer F2B
// // router.post("/transfer",raw(FMiddleware.transferFamilyMiddle), raw(C.transferFromFamilyToBusiness));

// // // Close family account by ID
// // router.put("/close/:id",raw(FMiddleware.closeFamilyMiddle), raw(C.closeFamilyAccountById));

// export default router;
