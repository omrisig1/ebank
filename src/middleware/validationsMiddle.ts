import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js';
import config from '../../config.json';

export async function minBalanceFromIndividTrans(req: Request, res: Response, next: NextFunction) {
  try {
    //    const accountType = get ID and balance  from request and check in DB accordingly
    Validator.checkAccountTypeEquals('individual', 'individual');
    Validator.balanceGreaterThan(JSON.parse(JSON.stringify(config.account_minimum_transfer)), 300);
    next();
  } catch (err) {
    next(err);
  }
}

export async function createFamilyBaseMiddle(req: Request, res: Response, next: NextFunction) {
  try {
    // const family = req.body;
    // Validator.mandatoryFieldExists(family,oweners);
    // Validator.mandatoryFieldExists(family,currency);
    // Validator.currencyIsValid(family.currency)
    // for (const individual_id of family.oweners) {
    //  Validator.isValnumeric(individual_id);
    //  Validaotr.stringLengthAtLeast(individual_id,7)
    // }
    next();
  } catch (err) {
    next(err);
  }
}

export async function createFamilyOwnerseMiddle(req: Request, res: Response, next: NextFunction) {
  try {
    // const family = req.body;
    // Validator.mandatoryFieldExists(family.currency,currency);
    // Validator.currency
    // for (const individual_id of family.oweners) {
    //  let account = INDIVIDUAL_DAL.getAccountByID(individual_id);
    //  Validator.accountExists(individual_id);
    //  Validaotr.mandatoryFieldExists(account,currency)
    //  Validator.currency
    // }
    Validator.checkAccountTypeEquals('individual', 'individual');
    const amount = JSON.parse(JSON.stringify(config.account_minimum_transfer));
    const reqBalance = 300;
    Validator.balanceGreaterThan(amount, reqBalance);
    next();
  } catch (err) {
    next(err);
  }
}
/*
All accounts exist
The currency is mandatory
The owners of the same account have the same address (live at the same place)
All accounts are of type individual
All accounts (the family and the individual ones) have the same currency
*/
