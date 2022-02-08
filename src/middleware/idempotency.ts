import { NextFunction, Request, Response } from "express";
import * as Util from '../modules/utils.dal.js';

export const idempotencyCheck = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    if ('idempotency_key' in req.headers) {
        const response = await Util.getReponseByIdempotencyKey('USER_1',req.headers.idempotency_key);
        if(response){
            if(await Util.sameRequest('USER_1',req, req.headers.idempotency_key)){
                //same request
                res.status(200).json(response);
            }
            //not same request
            res.status(412).json('PRECONDITION FAILED');
        }
    }
    next();
};
