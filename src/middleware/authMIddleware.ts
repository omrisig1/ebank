/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from "express";
import Util from '../modules/utils.dal.js';

// Middleware to generate requestID
export default async  function testAuth(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const string = Util.generateRequestString(req);
    if(!('access_key' in req.headers)) {
        throw new Error('Not Authorized'); 
    }
    const access_key = req.headers['access_key'];
    const secret = await Util.getSecretByAccess(access_key as string);
    if(secret.length == 0 || !('secret_key' in secret[0])) {
        throw new Error('Not Authorized');
    }
    const salt = req.headers.salt?  req.headers.salt as string : '';
    const hash = Util.makeHash256(string,salt+secret[0].secret_key)
    console.log(hash);
    if(!req.headers.req_hash || req.headers.req_hash != hash ) {
        throw new Error('Not Authorized');
    }
    next();
}
