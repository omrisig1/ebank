import express from 'express';
import * as validations from '../../middleware/validationsMiddle.js';
import * as C from '../individual/individual.controller.js';

const router = express.Router();
router.use(express.json());

router.get('/', validations.minBalanceFromIndividTrans, C.testRoute);

// /*
//   if there is an error thrown in the DB, asyncMiddleware
//   will pass it to next() and express will handle the error */
//   import raw from "../../middleware/route.async.wrapper.js";
//   import {generalValidator} from "../../middleware/route.validator.js";
//   import * as C from "./user.controller.js";
//   import express, {Request,Response, NextFunction } from 'express';
//   import { authenticate, authorize } from "../../middleware/authenticate.middleware.js";
//   const router = express.Router();
//   // parse json req.body on post routes
//   router.use((req:Request, res:Response, next:NextFunction)=>{
//     req.id = Math.random().toString(36).substring(7);
//     next();
//   })
//   // CREATES A NEW USER
//   router.post("/",  raw(C.createUser));
//   router.post("/register", raw(C.createUser));
// GET ALL USERS
//   // GETS A SINGLE USER
//   router.get("/:id",raw(C.getUserByID));
//   // UPDATES A SINGLE USER
//   router.put("/:id",raw(C.updateUser));
//   // DELETES A USER
//   router.delete("/:id", raw(C.deleteUser));
//   // GET A BATCH OF USERS
//   router.get("/pagination/:page/:batch_size",raw(C.paginate));
//   // CREATES A NEW PLAYLIST - POST METHOD
//   router.post("/playlist", raw(C.createPlayList));
//   // REMOVE SONG FROM PLAYLIST
//   router.put("/playlist/remove/",raw(C.removeFromPlaylist));
//  // ADD SONG TO PLAYLIST
//  router.post("/addtoplaylist/",raw(C.addToPlaylist));
//   export default router;
