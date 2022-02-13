/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import { getAccountsByIds } from '../modules/utils.dal.js';
import { account_status, account_type } from '../types/types.js';
import * as Validator from '../validations/validator.js'; 
// import * as family_dal from '../modules/family/family.dal.js';

export async function changeStatusMiddle(req: Request, res: Response, next: NextFunction) : Promise<void> {
  Validator.mandatoryFieldExists(req.body, ['list_of_accounts', 'action']);
  Validator.isTypeArray(req.body.list_of_accounts, 'list_of_accounts');
  Validator.isStatusExists(req.body.action);
  Validator.NumberGreaterThan(req.body.list_of_accounts.length, 0, "list_of_accounts array length");
  for (const account_id of req.body.list_of_accounts) {
    await Validator.checkAccountTypeEquals(account_id as number, [account_type.INDIVIDUAL, account_type.BUSINESS]);
  }
  const accounts = await getAccountsByIds(req.body.list_of_accounts);
  Validator.NumberEquals(
    [req.body.list_of_accounts.length, 'list_of_accounts array length provided'],
    [accounts.length, 'array length expected']
    );
   
  for (const acc of accounts) {
    Validator.accountStatusNotEquals(account_status[acc.status_id as number], req.body.action);
  }
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