/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from "express";
import Util from '../modules/utils.dal.js';
import crypto from 'crypto';

// Middleware to generate requestID
export default async  function testAuth(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const string = req.method + JSON.stringify(req.url) + JSON.stringify(req.params) + JSON.stringify(req.body);
    if(!('access_key' in req.headers)) {
        throw new Error('Not Authorized'); 
    }
    const access_key = req.headers['access_key'];
    const secret = await Util.getSecretByAccess(access_key as string);
    if(secret.length == 0 || !('secret_key' in secret[0])) {
        throw new Error('Not Authorized');
    }
    const salt = req.headers.salt?  req.headers.salt as string : '';
    const sha256Hasher = crypto.createHmac("sha256", salt+(secret[0].secret_key));
    const hash = sha256Hasher.update(string).digest("hex");
    console.log(hash);
    if(!req.headers.req_hash || req.headers.req_hash != hash ) {
        throw new Error('Not Authorized');
    }
    next();
}
