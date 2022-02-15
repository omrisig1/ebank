/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import Validator from '../validations/validator.js'; 
import Util from '../modules/utils.dal.js';
import { account_status, account_type } from '../types/types.js';
import config from '.././config.js';

export function createBuisnessMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.body,['company_id','company_name','currency']);
     Validator.companyIdValidation(req.body.company_id);
     Validator.currencyIsValid(req.body.currency);
      if (req.body.balance) {
        Validator.balanceValidation(req.body.balance, '0');
      }
    next();
    /*
      2.1.1 mandatory fields:
        2.1.1.1 company_id
        2.1.1.2 company_name
        2.1.1.3 currency
      2.1.2 numeric company id
      2.1.3 company_id length equal to 8
    */
}

export async function getBuisnessMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.params,['id']);
  await Validator.accountIdValidation(req.params.id, 'id', account_type.BUSINESS);
  next();
  /*
    2.2.1 mandatory fields:
		  2.2.1.1 primary_id
	  2.2.2 numeric primary_id
  */
}

export async function transferBuisnessSameCurMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body, ['source_account', 'destination_account', 'amount']);
  await Validator.sourceAndDestinationValidation(req.body.source_account, req.body.destination_account);
  Validator.amountValidation(req.body.amount);
  
  const source_account = await Util.getAccountById(req.body.source_account);
  const destination_account = await Util.getAccountById(req.body.destination_account);

  await Validator.checkAccountTypeEquals(source_account.account_id as number, [account_type.BUSINESS]);
  await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.BUSINESS,account_type.INDIVIDUAL]);

  Validator.accountStatusEquals([source_account.status_id as number,"source account status"], [account_status.ACTIVE,"Active"]);
  Validator.accountStatusEquals([destination_account.status_id as number,"destination account status"], [account_status.ACTIVE, "Active"]);
  
  Validator.balanceValidation(source_account.balance, 'source_account balance');
  Validator.checkAccountCurrencyEquals([source_account.currency,"source currency"], [destination_account.currency,"destination currency"])
  Validator.balanceGreaterThan((Number(source_account.balance)-Number(req.body.amount)),"business balance after transfer", config.business.MIN_BALANCE, `business minimum balance(${config.business.MIN_BALANCE})`);
  next();

}

export async function transferBuisnessDiffCurMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body,['source_account','destination_account','amount']);
  await Validator.sourceAndDestinationValidation(req.body.source_account, req.body.destination_account);
  Validator.amountValidation(req.body.amount);

  const source_account = await Util.getAccountById(req.body.source_account);
  const destination_account = await Util.getAccountById(req.body.destination_account);

  await Validator.checkAccountTypeEquals(source_account.account_id as number, [account_type.BUSINESS]);
  await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.BUSINESS]);
  
  Validator.accountStatusEquals([source_account.status_id as number,"source account status"], [account_status.ACTIVE,"Active"]);
  Validator.accountStatusEquals([destination_account.status_id as number,"destination account status"], [account_status.ACTIVE, "Active"]);

  Validator.balanceValidation(source_account.balance, 'source_account balance');
  Validator.balanceGreaterThan((Number(source_account.balance)-Number(req.body.amount)),"business balance after transfer", config.business.MIN_BALANCE, `business minimum balance(${config.business.MIN_BALANCE})`);

  next();
        
}