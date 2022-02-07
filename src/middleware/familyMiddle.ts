// import { Response, Request, NextFunction } from 'express';
// import * as Validator from '../validations/validator.js';

// export function createFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//       Validator.mandatoryFieldExists(req.body,['oweners','currency']);
//       Validator.currencyIsValid(req.body.currency)
//       const accounts = util.getIndividualAccountByPrimaryIds(req.body.owners.map((arr)=> return arr[0]));
//       const sum = req.body.owners.reduce((total,curr)=> {return total+curr[1]},0);
//       Validator.NumberGreaterThan(sum,5000);
//       for (const acc of accounts) {
//           Validator.accountExists(acc.individual_id);  
//           Validator.accountActive(acc.individual_id);  
//           Validator.checkAccountTypeEquals(acc.type,'individual');  
//           Validator.checkAccountCurrencyEquals(acc.currency, req.body.currency)
//           Validator.isValNumeric(acc.individual_id);
//           Validator.stringLengthAtLeast(acc.individual_id,7)
//       }
//       //check balance after minus the amount 
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }

//   /*
//   		3.1.1 mandatory fields:
// 			3.1.1.1 owners tuple
// 3.1.1.1.1 amount for every owner
// 				3.1.1.1.2 primary_id for every owner
// 			3.1.1.2 currency
// 			3.1.2 sum of amount greater than 5000
// 		3.1.3 for each owner:
// 			3.1.3.1 account exists
// 			3.1.3.2 account active
// 			3.1.3.3 type individual
// 			3.1.3.4 same currency as family
// 			3.1.3.5 minimum after transfer amount greater than 1000
//   */
  
// //   export function createFamilyOwnerseMiddle(req: Request, res: Response, next: NextFunction) : void{
// //     try {
// //       // const family = req.body;
// //       //validator.sumAmmunts(,req.body.owners.id, 5000);
// //       // for (const individual_id of family.oweners.ID) {
// //       //  let account = INDIVIDUAL_DAL.getAccountByID(individual_id);
// //       //  Validator.accountExists(individual_id);
// //       //  Validaotr.mandatoryFieldExists(account,currency)
// //         // Validator.currencyIsValid(account.currency);
// //         // Validator.checkAccountCurrencyEquals(req.body.family.currency, account.currency);
// //             // Validator.checkAccountTypeEquals('individual', 'individual');
// //        // Validator.checkMinBalance(req.body.individual_id,1000, req.body.owners.amount);
// //        //Validator.checkAccountStatus(account.status, 'ACTIVE');
// //       // }
  
// //       next();
// //     } catch (err) {
// //       next(err);
// //     }
// //   }

// export function getFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//        Validator.mandatoryFieldExists(req.param,['primary_id']);
//        Validator.isValNumeric(req.param.primaty_id)
//       next();
//     } catch (err) {
//       next(err);
//     }
// }

// export function addIndividualToFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//         Validator.mandatoryFieldExists(req.body,['primary_id','ids']);
//         Validator.mandatoryFieldExists(req.param,['family_id']);
//         Validator.isValNumeric(req.param.primaty_id);
//         const amounts = ids.map(item=>ids[1]) ;
//         amounts.map(amount=>Validator.isPositive(amount));
//         const account = util.getAccountByID(req.param.family_id);
//         const accounts = util.getIndividualAccountByPrimaryIds(req.body.ids.map((arr)=> return arr[0]));
//       for (const acc of accounts) {
//           Validator.checkAccountTypeEquals(acc.type,'individual');
//           Validator.checkAccountCurrencyEquals(acc.currency, account.currency);
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
// }
// /*
// 3.3.1 mandatory fields:
// 			3.3.1.1 primary_id
// 			3.3.1.2 list of non empty individual ids and amount
// 		3.3.2 all amount are positive
// 		3.3.3 primary id is numeric
// 		3.3.4 all accounts have same currency as the family account
// 		3.3.5 all are of type individual
// */

// export function removeIndividualToFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//         Validator.mandatoryFieldExists(req.body,['primary_id','ids']);
//         Validator.mandatoryFieldExists(req.param,['family_id']);
//         Validator.isValNumeric(req.param.primaty_id)
//         const amounts = req.body.ids.map(item=>ids[1]);
//         amounts.map(amount=>Validator.isPositive(amount));
//         const remove_ids = req.body.ids.map(item=>item[0]);
//         const family_accounts = getIndividualAccountsByFamily_id(req.param.family_id);
//         for (const id of remove_ids) {
//           Validator.inFamily(family_accounts, id);
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
// }
// /*
// 3.4.1 mandatory fields:
// 			3.4.1.1 primary_id
// 			3.4.1.2 list of non empty individual ids and amount
// 		3.4.2 all amount are positive
// 		3.4.3 primary id is numeric
// 		3.4.4 all accounts are part of the family, error if not.
// */

// export function closeFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//        Validator.mandatoryFieldExists(req.param,['family_id']);
//        Validator.isValNumeric(req.param.family_id)
//       next();
//     } catch (err) {
//       next(err);
//     }
// }
// /*
// 3.6.1 mandatory fields:
// 			3.6.1.1 primary_id
// 			3.6.2 numeric primary_id
// 3.6.2 primary_id numeric
// */

// export function transferFamilyMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//        Validator.mandatoryFieldExists(req.body,['source','destination','amount']);
//        Validator.isValNumeric(req.body.source);
//        Validator.isValNumeric(req.body.destination);
//        Validator.isValNumeric(req.body.amount);
//        Validator.isPositive(req.body.amount);
//        const source_family_account = util.getAccountById(req.body.source);
//        const destination_account = util.getAccountById(req.body.destination);
//        Validator.accountStatusEquals(source_family_account.status, 'ACTIVE');
//        Validator.accountStatusEquals(destination_account.status, 'ACTIVE');
//        Validator.checkAccountTypeEquals(source_family_account.type,'family');
//        Validator.checkAccountTypeEquals(destination_account.type,'biosness');
//        Validator.checkAccountCurrencyEquals(source_family_account.currency, destination_account.currency);
//        Validator.balanceGreaterThan(source_family_account.balance-req.body.amount, 5000)
//        const owners_ids = util.getIndividualAccountsByFamily_id(req.body.source);
//        const full_accounts_info = util.getIndividualAccountByPrimaryIds(owners_ids);
//        for (const acc of full_accounts_info) {
//           Validator.checkAccountTypeEquals(acc.type, 'individual');
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
// }
// /*
// 3.5.1 Mandatory fields:
// 		3.5.3 per owner
// 			3.5.3.1 account exits
// 			3.5.3.2 account active
// 			3.5.3.3 type individual
// 			3.5.3.4 all of type same as family 
// 		3.5.4 source is type family
// 		3.5.5 destination type business
// 		3.5.6 family currency same as business
// 		3.5.7 family balance after transfer is greater than 5000
// */