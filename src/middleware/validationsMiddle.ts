import { Response, Request, NextFunction } from 'express';
// import * as Validator from '../validations/validator.js';
// import config from '../../config.json';

export function minBalanceFromIndividTrans(req: Request, res: Response, next: NextFunction) : void{
  try {
    // Validator.checkAccountTypeEquals('individual', 'individual');
    // Validator.checkMinBalance(req.body.individual_id,1000, req.body.amount);
    next();
  } catch (err) {
    next(err);
  }
}

export function createFamilyBaseMiddle(req: Request, res: Response, next: NextFunction) : void{
  try {
    // const family = req.body;
    // Validator.mandatoryFieldExists(req.body,oweners);
    // Validator.mandatoryFieldExists(req.body.family,currency);
    // Validator.currencyIsValid(req.body.family.currency)
    // for (const individual_id of family.oweners) {
    //  Validator.isValNumeric(individual_id);
    //  Validaotr.stringLengthAtLeast(individual_id,7)
    // }
    next();
  } catch (err) {
    next(err);
  }
}

export function createFamilyOwnerseMiddle(req: Request, res: Response, next: NextFunction) : void{
  try {
    // const family = req.body;
    //validator.sumAmmunts(,req.body.owners.id, 5000);
    // for (const individual_id of family.oweners.ID) {
    //  let account = INDIVIDUAL_DAL.getAccountByID(individual_id);
    //  Validator.accountExists(individual_id);
    //  Validaotr.mandatoryFieldExists(account,currency)
      // Validator.currencyIsValid(account.currency);
      // Validator.checkAccountCurrencyEquals(req.body.family.currency, account.currency);
          // Validator.checkAccountTypeEquals('individual', 'individual');
     // Validator.checkMinBalance(req.body.individual_id,1000, req.body.owners.amount);
     //Validator.checkAccountStatus(account.status, 'ACTIVE');
    // }

    next();
  } catch (err) {
    next(err);
  }
}

export function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : void{
  // Validator.mandatoryFieldExists(req.body,['individual_id','first_name','last_name','currency']);
  // Validator.isValNumeric(req.body.individual_id);
  // Validator.stringLengthAtLeast(req.body.individual_id,7);
  // Validator.IndividualIDExists(req.body.individual_id as string);
  next();
  /*
  Mandatory fields:
The individual id number
Their first name
Their last name
currency
If the primaryID (not the individualID) is provided, an error should be returned
The individualID should be a number greater or equal to 1,000,000 and to have 7 digits
There can be only one (individual account on our system)

  */
}
