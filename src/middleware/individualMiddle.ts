/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import Validator from '../validations/validator.js'; 
import config from ".././config.js";
import { account_status, account_type } from '../types/types.js';
import Util from "../modules/utils.dal.js";
import family_dal from "../modules/family/family.dal.js";

export async function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.body, ['individual_id', 'first_name', 'last_name', 'currency']);
    await Validator.individualIdValidation(req.body.individual_id);  
    Validator.currencyIsValid(req.body.currency);
    if(req.body.email) {
        Validator.emailValidation(req.body.email);
    }
    if (req.body.balance) {
      Validator.balanceValidation(req.body.balance, '0');
    }
    next();
    /*
      1.1 create individual account:
        1.1.1 mandatory fields:
          1.1.1.1 individual_id
          1.1.1.2 first_name
          1.1.1.3 last_name
          1.1.1.4 currency
        1.1.2 numeric individual_id
        1.1.3 unique individual_id
        1.1.4 individual_id length equal to 7
    */
}

export async function getIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.params,['id']);
    await Validator.accountIdValidation(req.params.id, 'id', account_type.INDIVIDUAL);
    next();
    /*
      1.2 get individual account:
        1.2.1 mandatory fields:
          1.2.1.1 primary_id
        1.2.2 numeric primary_id
    */
}

export async function transferIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.body,['source_account','destination_account','amount']);
  console.log(req.body.source_account);
  console.log(req.body.destination_account);
  
    
  await Validator.sourceAndDestinationValidation(req.body.source_account, req.body.destination_account);
    Validator.amountValidation(req.body.amount);
  
    const source_individual_account = await Util.getAccountById(req.body.source_account);
    const destination_account = await Util.getAccountById(req.body.destination_account);
    
    await Validator.checkAccountTypeEquals(source_individual_account.account_id as number, [account_type.INDIVIDUAL]);
    await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.FAMILY]);
    
    const owners_ids = await family_dal.getOwnersListByFamilyAccountId(req.body.destination_account);
    Validator.inFamily(owners_ids,String(req.body.source_account),Number(req.body.destination_account));
    
    await Validator.checkAccountTypeEquals(source_individual_account.account_id as number, [account_type.INDIVIDUAL]);
    await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.FAMILY]);
    
    Validator.accountStatusEquals([source_individual_account.status_id as number, "source status"], [account_status.ACTIVE, "Active"]);
    Validator.accountStatusEquals([destination_account.status_id as number," destination status"], [account_status.ACTIVE,"Active"]);
    Validator.isValNumeric(source_individual_account.balance, 'balance');
    Validator.checkAccountCurrencyEquals([source_individual_account.currency, "source account currency"], [destination_account.currency, "desination account currency"]);
    Validator.balanceGreaterThan(source_individual_account.balance - req.body.amount,"balance after transfer", config.individual.MIN_BALANCE,`individual minimum balance(${config.individual.MIN_BALANCE})`);
    next();
  }


