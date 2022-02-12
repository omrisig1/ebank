/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 
import config from "../../config.json";
import * as Util from "../modules/utils.dal.js";
import { account_type, account_status } from '../types/types.js';
import * as family_dal from "../modules/family/family.dal.js";

export async function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
     Validator.mandatoryFieldExists(req.body,['individual_id','first_name','last_name','currency']);
     if(req.body.email) {
         Validator.emailValidation(req.body.email);
     }
     Validator.isValNumeric(req.body.individual_id);
    //add validation - config.individual.MIN_INDIVIDUAL_ID_NUM
     Validator.stringLengthAtLeast(req.body.individual_id,config.individual.INDIVIDUAL_ID_DIGITS);
     await Validator.IndividualIDUnique(req.body.individual_id);
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
		1.1.4 individual_id length greater equal than 7
    */
}

export function getIndividualMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.params,['id']);
     Validator.isValNumeric(req.params.id);
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
    Validator.isValNumeric(req.body.source_account);
    Validator.isValNumeric(req.body.destination_account);
    Validator.isValNumeric(req.body.amount);
    Validator.isPositive(req.body.amount);

    await Validator.isAccountExists(Number(req.body.source_account));
    await Validator.isAccountExists(Number(req.body.destination_account));

    Validator.NumberNotEquals(req.body.source_account, req.body.destination_account);
    const source_individual_account = await Util.getAccountById(req.body.source_account);
    const destination_account = await Util.getAccountById(req.body.destination_account);
    const owners_ids = await family_dal.getOwnersListByFamilyAccountId(req.body.destination_account);
    Validator.inFamily(owners_ids, req.body.source_account);
    // Validator.NumberEquals(destination_account.length, 1);
    // Validator.NumberEquals(source_family_account.length, 1);
    await Validator.checkAccountTypeEquals(source_individual_account.account_id as number, account_type.INDIVIDUAL);
    await Validator.checkAccountTypeEquals(destination_account.account_id as number, account_type.FAMILY);

    Validator.accountStatusEquals(source_individual_account.status_id, account_status.ACTIVE);
    Validator.accountStatusEquals(destination_account.status_id, account_status.ACTIVE);

    Validator.checkAccountCurrencyEquals(source_individual_account.currency, destination_account.currency);
    Validator.balanceGreaterThan(source_individual_account.balance - req.body.amount, config.individual.MIN_BALANCE)

    next();
  }