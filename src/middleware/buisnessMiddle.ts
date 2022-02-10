/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 
import * as Util from '../modules/utils.dal.js';
import * as B_DAL from '../modules/business/business.dal.js';
import { account_status } from '../types/types.js';

export function createBuisnessMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.body,['company_id','company_name','currency']);
     Validator.currencyIsValid(req.body.currency);
     Validator.isValNumeric(req.body.company_id);
     Validator.stringLengthAtLeast(req.body.company_id,8);
    next();
    /*
    2.1.1 mandatory fields:
		2.1.1.1 company_id
		2.1.1.2 company_name
		2.1.1.3 currency
	2.1.2 numeric company id
	2.1.3 company_id length greater equal than 8

    */
}

export function getBuisnessMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.params,['id']);
     Validator.isValNumeric(req.params.id);
    next();
    /*
    2.2.1 mandatory fields:
		2.2.1.1 primary_id
	2.2.2 numeric primary_id

    */
}

export async function transferBuisnessSameCurMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
        Validator.mandatoryFieldExists(req.body,['source_account','destination_account','amount']);
        Validator.isValNumeric(req.body.source_account);
        Validator.isValNumeric(req.body.destination_account);
        Validator.isValNumeric(req.body.amount);
        Validator.isPositive(req.body.amount);
        const source_account = await Util.getAccountById(req.body.source_account);
        const destination_account = await Util.getAccountById(req.body.destination_account);
        Validator.isExists(source_account);
        Validator.isExists(destination_account)
        Validator.accountStatusEquals(source_account.status_id, account_status.ACTIVE);
        Validator.accountStatusEquals(destination_account.status_id, account_status.ACTIVE);
        Validator.checkAccountCurrencyEquals(source_account.currency, destination_account.currency)
        Validator.balanceGreaterThan((Number(source_account.balance)-Number(req.body.amount)), '10000');
        Validator.isValNumeric(source_account.balance)  ;
      next();

}

export async function transferBuisnessDiffCurMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
       Validator.mandatoryFieldExists(req.body,['source_account','destination_account','amount']);
        Validator.isValNumeric(req.body.source_account);
        Validator.isValNumeric(req.body.destination_account);
        Validator.isValNumeric(req.body.amount);
        Validator.isPositive(req.body.amount);
        const buisness_source = await B_DAL.getBusinessesByAccountsIds([(req.body.source_account)]);
        const buisness_destination = await B_DAL.getBusinessesByAccountsIds([(req.body.destination_account)]);
        Validator.NumberEquals(buisness_source.length, 1); // account exists and it's buisness
        Validator.NumberEquals(buisness_source.length, 1); // account exists and it's buisness
        Validator.accountStatusEquals(buisness_source[0].status_id, account_status.ACTIVE);
        Validator.accountStatusEquals(buisness_destination[0].status_id, account_status.ACTIVE);
        Validator.balanceGreaterThan(buisness_source[0].balance-req.body.amount, 10000)
        next();
        
}