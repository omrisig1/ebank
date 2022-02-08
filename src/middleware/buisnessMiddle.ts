/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 
import * as Util from '../modules/utils.dal.js';
import * as B_DAL from '../modules/business/business.dal.js';

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
        Validator.accountStatusEquals(source_account.status_id, '1');
        Validator.accountStatusEquals(destination_account.status_id, '1');
        Validator.checkAccountCurrencyEquals(source_account.currency, destination_account.currency)
        Validator.isValNumeric(source_account.balance)  ;
        Validator.balanceGreaterThan((Number(source_account.balance)-Number(req.body.amount)), '10000');
      next();

}

export async function transferBuisnessDiffCurMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
       Validator.mandatoryFieldExists(req.body,['source','destination','amount']);
        Validator.isValNumeric(req.body.source);
        Validator.isValNumeric(req.body.destination);
        Validator.isValNumeric(req.body.amount);
        Validator.isPositive(req.body.amount);
        const source_account = await Util.getAccountById(req.body.source);
        const destination_account = await Util.getAccountById(req.body.destination);
        const buisness_source = await B_DAL.getBusinessesByAccountsIds([req.body.source, req.body.destination]);
        Validator.NumberEquals(buisness_source.length, 2); // account exists and it's buisness
        Validator.accountStatusEquals(source_account.status_id, '1');
        Validator.accountStatusEquals(destination_account.status_id, '1');
        Validator.balanceGreaterThan(source_account.balance-req.body.amount, 10000)
      next();

}