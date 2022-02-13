/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextFunction, Request, Response } from "express";
import buisness_dal from "../modules/business/business.dal.js";
import individual_dal from "../modules/individual/individual.dal.js";
import * as T from "../types/types.js";
import Validator from '../validations/validator.js'; 

export function black_list_Middleware(type : string) {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void>{
        await Validator.isAccountExists(Number(req.body.source_account));
        switch(type) {
            case (T.account_type.INDIVIDUAL):
                let ind_account = await individual_dal.getIndividualAccountByAccountId(req.body.source_account);
                if(ind_account.black_list) {
                    throw new Error("Individual source account black listed for money transfer");
                }
                break;
            case (T.account_type.BUSINESS):
                let buis_account = await buisness_dal.getBusinessAccountByAccountId(req.body.source_account);
                if(buis_account.black_list) {
                    throw new Error("Buisness source account black listed for money transfer");
                }
                break;
        }
        next();
    }
}
