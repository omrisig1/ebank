/* eslint-disable @typescript-eslint/await-thenable */
import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express";

export default function (fn: RequestHandler) {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}