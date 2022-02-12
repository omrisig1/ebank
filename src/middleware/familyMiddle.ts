/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js';
import * as individual_dal from '../modules/individual/individual.dal.js';
import * as buisness_dal from '../modules/business/business.dal.js';
import * as family_dal from '../modules/family/family.dal.js';

import * as Util from '../modules/utils.dal.js';
import { account_status } from '../types/types.js';
import config from '../../config.json';

export async function createFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
      Validator.mandatoryFieldExists(req.body,['owners','currency']);
      Validator.currencyIsValid(req.body.currency);
      if (req.body.balance) {
        Validator.isValNumeric(req.body.balance);
        Validator.balanceGreaterThan(req.body.balance, 0);
      }
      Validator.isTypeArray(req.body.owners, 'owners');
      Validator.NumberGreaterThan(req.body.owners.length, 0);
      for (const owner of req.body.owners) {
        Validator.isTypeArray(owner, 'owners[]');//array inside the array
        Validator.NumberEquals(owner.length, 2);
        Validator.isValNumeric(owner[0]);
        Validator.isValNumeric(owner[1]);
        Validator.NumberGreaterThan(owner[1], 0);
      }
      const account_ids = req.body.owners.map((arr: any) => arr[0]);
      const accounts = await individual_dal.getIndividualsByAccountsIds(account_ids);
      const sum = req.body.owners.reduce((total:number,curr:any)=> {return total+Number(curr[1])},0);
      Validator.NumberGreaterThan(sum, config.family.MIN_BALANCE);
      Validator.NumberEquals(accounts.length, req.body.owners.length);
      for (const acc of accounts) {
          for (const owner of req.body.owners) {
              if(acc.account_id == owner[0]){
                let withdraw = owner[1];
                Validator.balanceGreaterThan(acc.balance - withdraw, config.individual.MIN_BALANCE);
              }
          }
          Validator.isExists(acc.individual_id);  
          Validator.accountActive(acc.status_id);  
          Validator.checkAccountCurrencyEquals(acc.currency, req.body.currency)
          Validator.isValNumeric(acc.individual_id);
          Validator.stringLengthAtLeast(acc.individual_id.toString(), config.individual.INDIVIDUAL_ID_DIGITS);
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

export function getFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
    try {
       Validator.mandatoryFieldExists(req.params,['id']);
       Validator.isValNumeric(req.params.id)
      next();
    } catch (err) {
      next(err);
    }
}

export async function addIndividualToFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
        Validator.mandatoryFieldExists(req.body,['individuals_to_add']);
        Validator.mandatoryFieldExists(req.params,['family_id']);
        Validator.isValNumeric(req.params.family_id);
        Validator.isTypeArray(req.body.individuals_to_add, 'individuals_to_add');
        Validator.NumberGreaterThan(req.body.individuals_to_add.length, 0);
        for (const owner of req.body.individuals_to_add) {
          Validator.isTypeArray(owner, 'individuals_to_add[]'); //array inside the array
          Validator.NumberEquals(owner.length, 2);
          Validator.isValNumeric(owner[0]);
          Validator.isValNumeric(owner[1]);
          Validator.NumberGreaterThan(owner[1], 0);
        }
        const amounts = req.body.individuals_to_add.map((item:any)=>item[1]) ;
        amounts.map((amount:any)=>Validator.isPositive(amount));
        const account_ids = req.body.individuals_to_add.map((arr:any)=> arr[0]);
        const family_account = await Util.getAccountById(Number(req.params.family_id));
        const individual_accounts = await individual_dal.getIndividualsByAccountsIds(account_ids);
        Validator.NumberEquals(individual_accounts.length, req.body.individuals_to_add.length);
        for (const acc of individual_accounts) {
          for (const owner of req.body.individuals_to_add) {
            if(acc.account_id == owner[0]){
              let withdraw = owner[1];
              Validator.balanceGreaterThan(acc.balance - withdraw, config.individual.MIN_BALANCE);
            }
        }
            Validator.checkAccountCurrencyEquals(acc.currency, family_account.currency);
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
        Validator.isValNumeric(req.params.family_id)
        Validator.isTypeArray(req.body.individuals_to_remove, 'individuals_to_remove');
        Validator.NumberGreaterThan(req.body.individuals_to_remove.length, 0);
        for (const owner of req.body.individuals_to_remove) {
          Validator.isTypeArray(owner, 'individuals_to_remove[]'); //array inside the array
          Validator.NumberEquals(owner.length, 2);
          Validator.isValNumeric(owner[0]);
          Validator.isValNumeric(owner[1]);
          Validator.NumberGreaterThan(owner[1], 0);
        }
        const amounts = req.body.individuals_to_remove.map((item:string)=>item[1]);
        amounts.map((amount:string)=>Validator.isPositive(amount));
        const remove_ids = req.body.individuals_to_remove.map((item:string)=>item[0]);
        const family_accounts = await family_dal.getOwnersListByFamilyAccountId(Number(req.params.family_id));
        for (const id of remove_ids) {
          Validator.inFamily(family_accounts, id);
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
       Validator.isValNumeric(req.params.id)
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
  Validator.isValNumeric(req.body.source_account);
  Validator.isValNumeric(req.body.destination_account);
  Validator.isValNumeric(req.body.amount);
  Validator.isPositive(req.body.amount);
  const source_family_account = await family_dal.getFamilyAccountsByAccountIDS(req.body.source_account);
  const destination_account = await buisness_dal.getBusinessesByAccountsIds(req.body.destination_account);

  Validator.NumberEquals(destination_account.length, 1);
  Validator.NumberEquals(source_family_account.length, 1);

  Validator.isExists(source_family_account[0].account_id);
  Validator.isExists(destination_account[0].account_id);
  Validator.accountStatusEquals(source_family_account[0].status_id, account_status.ACTIVE);
  Validator.accountStatusEquals(destination_account[0].status_id, account_status.ACTIVE);

  Validator.checkAccountCurrencyEquals(source_family_account[0].currency, destination_account[0].currency);
  Validator.balanceGreaterThan(source_family_account[0].balance - req.body.amount, config.family.MIN_BALANCE)
     const owners_ids = await family_dal.getOwnersListByFamilyAccountId(req.body.source);
     const full_accounts_info = await individual_dal.getIndividualsByAccountsIds(owners_ids);
     for (const acc of full_accounts_info) {
        Validator.isExists(acc.account_id);
        Validator.accountStatusEquals(acc.status_id, account_status.ACTIVE);
        Validator.checkAccountCurrencyEquals(source_family_account[0].currency, acc.currency);
          
          
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