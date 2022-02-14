/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import Util from '../modules/utils.dal.js';
import { account_status, account_type } from '../types/types.js';
import Validator from '../validations/validator.js'; 
// import * as family_dal from '../modules/family/family.dal.js';

export async function changeStatusMiddle(req: Request, res: Response, next: NextFunction) : Promise<void> {
  Validator.mandatoryFieldExists(req.body, ['list_of_accounts', 'action']);
  // Validator.isTypeArray(req.body.list_of_accounts, 'list_of_accounts');
  // for (const accunt_tuple of req.body.list_of_accounts as [string,string][]) {
  Validator.isTypeTuplesArray(req.body.list_of_accounts, 'list_of_accounts');
  // }
  Validator.isStatusExists(req.body.action);
  Validator.NumberGreaterThan(req.body.list_of_accounts.length, 0, "list_of_accounts array length");
  const account_ids = req.body.list_of_accounts.map((acc_tuple:any)=> acc_tuple[0]);
  for (const id of account_ids) {
    await Validator.isAccountExists(id);
  }
  const accounts = await Util.getAccountsByIds(account_ids);
  for (const acc of accounts) {
    await Validator.checkAccountTypeEquals(acc.account_id as number, [account_type.INDIVIDUAL,account_type.BUSINESS]);
    Validator.accountStatusNotEquals(account_status[acc.status_id as number], req.body.action);
  }
  Validator.NumberEquals(
    [req.body.list_of_accounts.length, 'list_of_accounts array length provided'],
    [accounts.length, 'array length expected']
    );
  next();
  /*
   4.1.1 mandatory fields:
			4.1.1.1 status
			4.4.1.2 list of non empty primary ids
		4.2 per account:
		4.2.1 all account exists
		4.2.2 all primary ids numeric
    4.2.3 non are of type family
    4.2.4  all are of a different type of the request type
    */
}