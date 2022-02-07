/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import log from "@ajar/marker";
import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http-exception.js";
import UrlNotFoundException from "../exceptions/urlNotFound-exception.js";
import { IErrorResponse } from "../types/types.js";
const { White, Reset, Red } = log.constants;

// Error logger middleware to cli
export const errorLogger = (err: HttpException, req: Request, res: Response, next: NextFunction): void => {
    log.red(
        `${err.status || 500}:: Message: ${err.message}. Request ID: ${req.requestID}. Time: ${Math.floor(Date.now() / 1000)}.`
    );
    next(err);
};

// Middleware to response with error response object
export const responseWithError = (err: HttpException, req: Request, res: Response, next: NextFunction): void => {
    const errorResponse: IErrorResponse = {
        status: err.status || 500,
        message: err.message || "Something went wrong",
    };
    res.status(errorResponse.status).json(errorResponse);
};

// Middleware to handle UrlNotFound Exception
export const urlNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(new UrlNotFoundException(req.path));
};

export const not_found = (req: Request, res: Response): void => {
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({ status: `url: ${req.url} not found...` });
};
