/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import HttpException from "../../exceptions/http-exception";

// Middleware for logging errors to txt file
export const appendToErrorLogger = (path: string) => async (err: HttpException, req: Request, res: Response, next: NextFunction): Promise<void> => {
    await fs.appendFile(path,
        `${err.status || 500}:: Message: ${err.message}. Request ID: ${req.requestID}. Time: ${Math.floor(Date.now() / 1000)} >> ${err.stack}.\n`
    );
    next(err);
};
