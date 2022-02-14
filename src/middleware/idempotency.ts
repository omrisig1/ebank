/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from "express";
import Util from '../modules/utils.dal.js';

interface Data  {
    response : string,
    db_hash : string
}

export const idempotencyCheck = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    if ('idempotency_key' in req.headers && 'req_hash' in req.headers && 'user' in req.headers) {
        const data = (await Util.getInfoByIdempotencyKey(req.headers.user as string,req.headers.idempotency_key as string)) as unknown as Data;
        if(data && data.response){
            
            const string = Util.generateRequestString(req);
            if(JSON.stringify(string) === JSON.stringify(data.db_hash) ) {
                res.status(200).json(JSON.parse(data.response as unknown as string));
                res.end();
                return;
            }
            else{
                res.status(412).json({message: 'PRECONDITION FAILED'});
                res.end()
                return;
            }
        }
    }
    next();
};
