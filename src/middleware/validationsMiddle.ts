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

export async function temp(req: Request, res: Response, next: NextFunction) {
  try {
    //    const accountType = get ID and balance  from request and check in DB accordingly
    Validator.checkAccountTypeEquals('individual', 'individual');
    const amount = JSON.parse(JSON.stringify(config.account_minimum_transfer));
    const reqBalance = 300;
    Validator.balanceGreaterThan(amount, reqBalance);
    next();
  } catch (err) {
    next(err);
  }
}
