/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js';
import * as individual_dal from '../modules/individual/individual.dal.js';
import * as buisness_dal from '../modules/business/business.dal.js';
import * as Util from '../modules/utils.dal.js';
import { account_status } from '../types/types.js';

export async function createFamilyMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
      Validator.mandatoryFieldExists(req.body,['owners','currency']);
      Validator.currencyIsValid(req.body.currency)
      const account_ids = req.body.owners.map((arr:any)=> arr[0]);
      const accounts = await individual_dal.getIndividualsByAccountsIds(account_ids);
      const sum = req.body.owners.reduce((total:number,curr:any)=> {return total+Number(curr[1])},0);
      Validator.NumberGreaterThan(sum,5000);
      Validator.NumberEquals(accounts.length, req.body.owners.length);
      for (const acc of accounts) {
          for (const owner of req.body.owners) {
              if(acc.account_id == owner[0]){
                let withdraw = owner[1];
                Validator.balanceGreaterThan(acc.balance-withdraw, 1000);
              }
          }
          Validator.isExists(acc.individual_id);  
          Validator.accountActive(acc.status_id);  
          Validator.checkAccountCurrencyEquals(acc.currency, req.body.currency)
          Validator.isValNumeric(acc.individual_id);
          Validator.stringLengthAtLeast(acc.individual_id.toString(),7)
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
  
//   export function createFamilyOwnerseMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//       // const family = req.body;
//       //validator.sumAmmunts(,req.body.owners.id, 5000);
//       // for (const individual_id of family.oweners.ID) {
//       //  let account = INDIVIDUAL_DAL.getAccountByID(individual_id);
//       //  Validator.accountExists(individual_id);
//       //  Validaotr.mandatoryFieldExists(account,currency)
//         // Validator.currencyIsValid(account.currency);
//         // Validator.checkAccountCurrencyEquals(req.body.family.currency, account.currency);
//             // Validator.checkAccountTypeEquals('individual', 'individual');
//        // Validator.checkMinBalance(req.body.individual_id,1000, req.body.owners.amount);
//       // Validator.checkAccountStatus(account.status, account_status.ACTIVE);
//       // }
  
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }

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
              Validator.balanceGreaterThan(acc.balance-withdraw, 1000);
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

export function removeIndividualFromFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
        Validator.mandatoryFieldExists(req.body,['individuals_to_remove']);
        Validator.mandatoryFieldExists(req.params,['family_id']);
        Validator.isValNumeric(req.params.family_id)
        const amounts = req.body.individuals_to_remove.map((item:string)=>item[1]);
        amounts.map((amount:string)=>Validator.isPositive(amount));
        // const remove_ids = req.body.individuals_to_remove.map((item:string)=>item[0]);
        // const family_accounts = getIndividualAccountsByFamily_id(req.params.family_id);
        // for (const id of remove_ids) {
        //   Validator.inFamily(family_accounts, id);
        // }
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
  const source_family_account = await Util.getAccountById(req.body.source_account);
  const destination_account = await Util.getAccountById(req.body.destination_account);
  Validator.isExists(source_family_account.account_id);
  Validator.isExists(destination_account.account_id);
  Validator.accountStatusEquals(source_family_account.status_id, account_status.ACTIVE);
  Validator.accountStatusEquals(destination_account.status_id, account_status.ACTIVE);
  // Validator.checkAccountTypeEquals(source_family_account.type,'family');
  // Validator.checkAccountTypeEquals(destination_account,'business');
  const buisness_accounts = await buisness_dal.getBusinessesByAccountsIds([req.body.destination_account]);
  //  const family_accounts = await family_dal.getFamilysByAccountsIds([req.body.destination]);
  Validator.NumberEquals(buisness_accounts.length, 1);
  //  Validator.NumberEquals(family_accounts.length, 1);
  Validator.checkAccountCurrencyEquals(source_family_account.currency, destination_account.currency);
  Validator.balanceGreaterThan(source_family_account.balance - req.body.amount, 5000)
  //    const owners_ids = await Util.getIndividualAccountsByFamily_id(req.body.source);
  //    const full_accounts_info = await individual_dal.getIndividualsByAccountsIds(owners_ids);
  //    for (const acc of full_accounts_info) {
  //        Validator.isExists(acc.account_id);
  //       Validator.accountStatusEquals(acc.status_id, '1');
  //       Validator.checkAccountTypeEquals(acc.type, 'individual');
  //       Validator.checkAccountCurrencyEquals(source_family_account.currency, acc.currency);
    //       
    //       
    //   }
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