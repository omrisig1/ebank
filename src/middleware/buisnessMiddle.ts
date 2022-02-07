// import { Response, Request, NextFunction } from 'express';
// import * as Validator from '../validations/validator.js'; 

// export function createBuisnessMiddle(req: Request, res: Response, next: NextFunction) : void{
//      Validator.mandatoryFieldExists(req.body,['company_id','company_name','currency']);
//      Validator.isValNumeric(req.body.company);
//      Validator.stringLengthAtLeast(req.body.company_id,8);
//     next();
//     /*
//     2.1.1 mandatory fields:
// 		2.1.1.1 company_id
// 		2.1.1.2 company_name
// 		2.1.1.3 currency
// 	2.1.2 numeric company id
// 	2.1.3 company_id length greater equal than 8

//     */
// }

// export function getBuisnessMiddle(req: Request, res: Response, next: NextFunction) : void{
//      Validator.mandatoryFieldExists(req.param,['id']);
//      Validator.isValNumeric(req.param.id);
//     next();
//     /*
//     2.2.1 mandatory fields:
// 		2.2.1.1 primary_id
// 	2.2.2 numeric primary_id

//     */
// }

// export function transferBuisnessSameCurMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//         Validator.mandatoryFieldExists(req.body,['source','destination','amount']);
//         Validator.isValNumeric(req.body.source);
//         Validator.isValNumeric(req.body.destination);
//         Validator.isValNumeric(req.body.amount);
//         Validator.isPositive(req.body.amount);
//         Validator.accountExists(req.body.source);
//         Validator.accountExists(req.body.destination)
//         const source_account = util.getAccountById(req.body.source);
//         const destination_account = util.getAccountById(req.body.destination);
//         Validator.checkAccountTypeEquals(source_account.type, 'active');
//         Validator.checkAccountTypeEquals(destination_account.type, 'active');
//         Validator.checkAccountCurrencyEquals(source_account.curr,destination_account.currency)
//         Validator.isValNumeric(source_account.balance)  ;
//         Validator.balanceGreaterThan((Number(source_account.balance)-Number(req.body.amount)), '10000');
//       next();
//     } catch (err) {
//       next(err);
//     }

// }

// export function transferBuisnessDiffCurMiddle(req: Request, res: Response, next: NextFunction) : void{
//     try {
//         Validator.mandatoryFieldExists(req.body,['source','destination','amount']);
//         Validator.isValNumeric(req.body.source);
//         Validator.isValNumeric(req.body.destination);
//         Validator.isValNumeric(req.body.amount);
//         Validator.isPositive(req.body.amount);
//         Validator.accountExists(req.body.source);
//         Validator.accountExists(req.body.destination)
//         const source_account = util.getAccountById(req.body.source);
//         const destination_account = util.getAccountById(req.body.destination);
//         Validator.accountStatusEquals(source_account.status, 'active');
//         Validator.accountStatusEquals(destination_account.status, 'active');
//         Validator.checkAccountTypeEquals(source_account.type, 'buisness');
//         Validator.checkAccountTypeEquals(destination_account.type, 'buisness');
//         Validator.balanceGreaterThan(source_account.balance-req.body.amount, 10000)
//       next();
//     } catch (err) {
//       next(err);
//     }

// }