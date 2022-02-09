import { NextFunction, Request, RequestHandler, Response } from "express";
import fs from "fs";

// Middleware for logging http requests to txt file
export function appendToRequestsLogger(path: string): RequestHandler {
    const writeable_file = fs.createWriteStream(path);
    return function (req: Request, res: Response, next: NextFunction) {
        const str = `${req.method}:: Request url:  ${req.url}. Request params:  ${JSON.stringify(req.params)}. Request body:  ${JSON.stringify(req.body,null, 2)}. Request query:  ${JSON.stringify(req.query)}.Request ID: ${req.requestID}. Time: ${Math.floor(Date.now() / 1000)}\n`
        writeable_file.write(str);
        next();
    }
}
