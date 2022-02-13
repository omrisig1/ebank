/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js';
import * as individual_dal from '../modules/individual/individual.dal.js';
import * as family_dal from '../modules/family/family.dal.js';

import * as Util from '../modules/utils.dal.js';
import { account_status, account_type } from '../types/types.js';
import config from '../../config.json';

export async function createFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body,['owners','currency']);
  Validator.currencyIsValid(req.body.currency);
  Validator.isTypeArray(req.body.owners, 'owners');
  Validator.NumberGreaterThan(req.body.owners.length, 0, "owners array length");
  const account_ids = req.body.owners.map((arr:any)=> arr[0]);
  const accounts = await individual_dal.getIndividualsByAccountsIds(account_ids);
  const sum_provided = req.body.owners.reduce((total:number,curr:any)=> {return total+Number(curr[1])},0);
  Validator.balanceGreaterThan(sum_provided,"sum of provided owners", config.family.MIN_BALANCE, `family minimun balance (${config.family.MIN_BALANCE})`);
  Validator.NumberEquals([accounts.length,"number of accounts"], [req.body.owners.length,"provided owners list length"]);
  for (const acc of accounts) {
    await Validator.isAccountExists(acc.account_id as number); 
    await Validator.checkAccountTypeEquals(acc.account_id as number, [account_type.INDIVIDUAL])
    for (const owner of req.body.owners) {
      Validator.isTypeArray(owner, 'owners[]');//array inside the array
      Validator.NumberEquals([owner.length, "owner length"], [2, "2 - [individual_account_id, amount]"]);
      Validator.isValNumeric(owner[0], "individual_account_id");
      Validator.isValNumeric(owner[1], "amount");
      Validator.NumberGreaterThan(owner[1], 0, "amount");
      if (acc.account_id == owner[0]) {
        let withdraw = owner[1];
        Validator.balanceGreaterThan(acc.balance - withdraw, "individual balance after transfer", config.individual.MIN_BALANCE, `individual minimum balance (${config.individual.MIN_BALANCE})`);
      }
    }
      // if (req.body.balance) { // ???????????????????????????????????????
      //   Validator.isValNumeric(req.body.balance, 'balance');
      //   Validator.balanceGreaterThan(req.body.balance, 'balance', 0, 'family minimum balance');
      // }
      Validator.accountActive(acc.status_id,acc.account_id as number);  
      Validator.checkAccountCurrencyEquals([acc.currency,"individual currency"], [req.body.currency,"provided currency"])
      // Validator.isValNumeric(acc.individual_id,"individual_id");
      // Validator.NumberEquals(
      //   [acc.individual_id.toString(), 'individual_id length'],
      //   [config.individual.INDIVIDUAL_ID_DIGITS, "number of digits"]
      // );
  }
  next();
} 


  /*
  		3.1.1 mandatory fields:
			3.1.1.1 owners tuple
3.1.1.1.1 amount for every owner
				3.1.1.1.2 primary_id for every owner
			3.1.1.2 currency
			3.1.2 sum of amount greater than 5000
		3.1.3 for each owner:
			3.1.3.1 account exists
			3.1.3.2 account active
			3.1.3.3 type individual
			3.1.3.4 same currency as family
			3.1.3.5 minimum after transfer amount greater than 1000
  */

export async function getFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.params,['id']);
  Validator.isValNumeric(req.params.id,"id");
  await Validator.isAccountExists(Number(req.params.id)); 
  await Validator.checkAccountTypeEquals(Number(req.params.id),[account_type.FAMILY]);
  next();
}

export async function addIndividualToFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body,['individuals_to_add']);
  Validator.mandatoryFieldExists(req.params,['family_id']);
  Validator.isValNumeric(req.params.family_id, "family_id");
  Validator.isTypeArray(req.body.individuals_to_add, 'individuals_to_add');
  Validator.NumberGreaterThan(req.body.individuals_to_add.length, 0, "individuals_to_add length");
  await Validator.checkAccountTypeEquals(Number(req.params.family_id), [account_type.FAMILY]);
  const amounts = req.body.individuals_to_add.map((item:any)=>item[1]) ;
  amounts.map((amount:any)=>Validator.isPositive(amount,"Amount"));
  const account_ids = req.body.individuals_to_add.map((arr:any)=> arr[0]);
  const family_account = await Util.getAccountById(Number(req.params.family_id));
  const individual_accounts = await individual_dal.getIndividualsByAccountsIds(account_ids);
  Validator.NumberEquals([individual_accounts.length,"number of individual accounts"], [req.body.individuals_to_add.length,"provided owners list to add"]);
  for (const acc of individual_accounts) {
    await Validator.isAccountExists(acc.account_id as number);
    await Validator.checkAccountTypeEquals(acc.account_id as number,[account_type.INDIVIDUAL]);
    for (const owner of req.body.individuals_to_add) {
      Validator.isTypeArray(owner, 'individuals_to_add[]');//array inside the array
      Validator.NumberEquals([owner.length, "individual length"], [2, "2 - [individual_account_id, amount]"]);
      Validator.isValNumeric(owner[0], "individual_account_id");
      Validator.isValNumeric(owner[1], "amount");
      Validator.NumberGreaterThan(owner[1], 0, "amount");
      if(acc.account_id == owner[0]){
        let withdraw = owner[1];
        Validator.balanceGreaterThan(acc.balance - withdraw,"individual balance after transfer", config.individual.MIN_BALANCE,`individual minimum balance(${config.individual.MIN_BALANCE})`);              
      }
  }
      Validator.checkAccountCurrencyEquals([acc.currency,"individual account currency"], [family_account.currency,"family account currency"]);
  }
  next();
}
/*
3.3.1 mandatory fields:
			3.3.1.1 primary_id
			3.3.1.2 list of non empty individual ids and amount
		3.3.2 all amount are positive
		3.3.3 primary id is numeric
		3.3.4 all accounts have same currency as the family account
		3.3.5 all are of type individual
*/

export async function removeIndividualFromFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body,['individuals_to_remove']);
  Validator.mandatoryFieldExists(req.params,['family_id']);
  Validator.isValNumeric(req.params.family_id, "family_id");
  Validator.isTypeArray(req.body.individuals_to_remove, 'individuals_to_remove');
  Validator.NumberGreaterThan(req.body.individuals_to_remove.length, 0, 'individuals_to_remove array length');
  await Validator.checkAccountTypeEquals(Number(req.params.family_id), [account_type.FAMILY]);
  for (const owner of req.body.individuals_to_remove) {
    Validator.isTypeArray(owner, 'individuals_to_remove[]');//array inside the array
    Validator.NumberEquals([owner.length, "individual length"], [2, "2 - [individual_account_id, amount]"]);
    Validator.isValNumeric(owner[0], "individual_account_id");
    Validator.isValNumeric(owner[1], "amount");
    Validator.NumberGreaterThan(owner[1], 0, "amount");
  }
  const amounts = req.body.individuals_to_remove.map((item:string)=>item[1]);
  amounts.map((amount:string)=>Validator.isPositive(amount,"Amount"));
  const remove_ids = req.body.individuals_to_remove.map((item:string)=>item[0]);
  const family_account = await Util.getAccountById(Number(req.params.family_id));
  const family_accounts = await family_dal.getOwnersListByFamilyAccountId(Number(req.params.family_id));
  const individual_accounts = await individual_dal.getIndividualsByAccountsIds(remove_ids);
  Validator.NumberEquals([individual_accounts.length,"number of individual accounts"], [req.body.individuals_to_remove.length,"provided owners list to remove"]);
  for (const id of remove_ids) {
    await Validator.isAccountExists(id as number);
    Validator.inFamily(family_accounts, id, family_account.account_id as number);
  }
  for (const acc of individual_accounts) {
    await Validator.checkAccountTypeEquals(acc.account_id as number,[account_type.INDIVIDUAL]);
    Validator.checkAccountCurrencyEquals([acc.currency,"individual account currency"], [family_account.currency,"family account currency"]);
  }
  next();
}
/*
3.4.1 mandatory fields:
			3.4.1.1 primary_id
			3.4.1.2 list of non empty individual ids and amount
		3.4.2 all amount are positive
		3.4.3 primary id is numeric
		3.4.4 all accounts are part of the family, error if not.
*/

export function closeFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
  Validator.mandatoryFieldExists(req.params,['id']);
  Validator.isValNumeric(req.params.id,"id");
  next();
}
/*
3.6.1 mandatory fields:
			3.6.1.1 family_id
			3.6.2 numeric family_id
3.6.2 family_id numeric
*/

export async function transferFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
  Validator.mandatoryFieldExists(req.body,['source_account','destination_account','amount']);
  Validator.isValNumeric(req.body.source_account,"source_account");
  Validator.isValNumeric(req.body.destination_account,"destination_account");
  Validator.isValNumeric(req.body.amount,"amount");
  Validator.isPositive(req.body.amount,"Amount");
  await Validator.isAccountExists(Number(req.body.source_account));
  await Validator.isAccountExists(Number(req.body.destination_account));
  Validator.NumberNotEquals([req.body.source_account,"source account"], [req.body.destination_account,"destination account"]);
  const source_family_account = await Util.getAccountById(req.body.source_account);
  const destination_account = await Util.getAccountById(req.body.destination_account);

  // Validator.NumberEquals(destination_account.length, 1);
  // Validator.NumberEquals(source_family_account.length, 1);

  await Validator.checkAccountTypeEquals(source_family_account.account_id as number, [account_type.FAMILY]);
  await Validator.checkAccountTypeEquals(destination_account.account_id as number, [account_type.BUSINESS]);
  
  Validator.accountStatusEquals([source_family_account.status_id as number,"source account status"], [account_status.ACTIVE,"Active"]);
  Validator.accountStatusEquals([destination_account.status_id as number,"destination account status"], [account_status.ACTIVE, "Active"]);

  Validator.checkAccountCurrencyEquals([source_family_account.currency,"source account currency"], [destination_account.currency,"destination account currency"]);
  Validator.balanceGreaterThan(source_family_account.balance - req.body.amount,"family balance after transfer", config.family.MIN_BALANCE, `family minimum balance(${config.family.MIN_BALANCE})`)
     const owners_ids = await family_dal.getOwnersListByFamilyAccountId(req.body.source_account);
     const full_accounts_info = await individual_dal.getIndividualsByAccountsIds(owners_ids);
     for (const acc of full_accounts_info) {
        await Validator.isAccountExists(acc.account_id as number);
        Validator.accountStatusEquals([acc.status_id as number,"individual account status"], [account_status.ACTIVE,"Active"]);
        Validator.checkAccountCurrencyEquals([source_family_account.currency,"family account currency"], [acc.currency, "individual account currency"]);
      }
      next();
}
/*
3.5.1 Mandatory fields:
		3.5.3 per owner
			3.5.3.1 account exits
			3.5.3.2 account active
			3.5.3.3 type individual
			3.5.3.4 all of type same as family 
		3.5.4 source is type family
		3.5.5 destination type business
		3.5.6 family currency same as business
		3.5.7 family balance after transfer is greater than 5000
*/