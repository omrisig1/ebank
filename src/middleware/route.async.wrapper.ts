import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express";

export default (fn: RequestHandler) =>
    (req: Request, res: Response, next: NextFunction): void => {
        try{
            fn(req, res, next);
        } catch (err){
            next(err);
        }
    }