/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from "express";
import v4 from "uuid";
const { v4: uuidv4 } = v4;

// Middleware to generate requestID
export const generateRequestID = (req: Request, res: Response, next: NextFunction) : void => {
    req.requestID = uuidv4();
    next();
};
