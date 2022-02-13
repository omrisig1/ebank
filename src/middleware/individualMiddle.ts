/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 
import config from "../../config.json";
import { account_status, account_type } from '../types/types.js';
import * as Util from "../modules/utils.dal.js";
import * as family_dal from "../modules/family/family.dal.js";

export async function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.body, ['individual_id', 'first_name', 'last_name', 'currency']);
    if(req.body.email) {
        Validator.emailValidation(req.body.email);
    }
    Validator.isValNumeric(req.body.individual_id, "individual_id");
    Validator.NumberGreaterThan(req.body.individual_id, config.individual.MIN_INDIVIDUAL_ID_NUM,"individual_id");
    Validator.NumberEquals(
      [req.body.individual_id.length, 'individual_id length'],
      [config.individual.INDIVIDUAL_ID_DIGITS, "number of digits"]
    );
    await Validator.IndividualIDUnique(req.body.individual_id,"individual id");

      if (req.body.balance) {
        Validator.isValNumeric(req.body.balance, "balance");
        Validator.balanceGreaterThan(req.body.balance, 'balance', 0, 'individual minimum balance');
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
    Validator.isValNumeric(req.params.id, "id");
    await Validator.isAccountExists(Number(req.params.id)); 
    await Validator.checkAccountTypeEquals(Number(req.params.id),[account_type.INDIVIDUAL]);
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
    Validator.isValNumeric(req.body.source_account, "source account");
    Validator.isValNumeric(req.body.destination_account, "destination account");
    Validator.isValNumeric(req.body.amount,"ammount");
    Validator.isPositive(req.body.amount,"amount");
    await Validator.isAccountExists(Number(req.body.source_account));
    await Validator.isAccountExists(Number(req.body.destination_account));
    Validator.NumberNotEquals(req.body.source_account, req.body.destination_account);
    const source_individual_account = await Util.getAccountById(req.body.source_account);
    const destination_account = await Util.getAccountById(req.body.destination_account);
    await Validator.checkAccountTypeEquals(source_individual_account.account_id as number, [account_type.INDIVIDUAL]);
    await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.FAMILY]);
    const owners_ids = await family_dal.getOwnersListByFamilyAccountId(req.body.destination_account);
    Validator.inFamily(owners_ids,String(req.body.source_account),Number(req.body.destination_account));
    // Validator.NumberEquals(destination_account.length, 1);
    // Validator.NumberEquals(source_family_account.length, 1);
    await Validator.checkAccountTypeEquals(source_individual_account.account_id as number, [account_type.INDIVIDUAL]);
    await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.FAMILY]);
    Validator.accountStatusEquals([source_individual_account.status_id as number,"source status"], [account_status.ACTIVE, "Active"]);
    Validator.accountStatusEquals([destination_account.status_id as number," destination status"], [account_status.ACTIVE,"Active"]);
    Validator.checkAccountCurrencyEquals([source_individual_account.currency,"source account currency"], [destination_account.currency,"desination account currency"]);
    Validator.balanceGreaterThan(source_individual_account.balance - req.body.amount,"balance after transfer", config.individual.MIN_BALANCE,`individual minimum balance(${config.individual.MIN_BALANCE})`);
    next();
  }