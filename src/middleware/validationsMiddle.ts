import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js';
import config from '../../config.json';

export default async function minBalFromIndivTran(req: Request, res: Response, next: NextFunction) {
  //    const accountType = get ID and balance  from request and check in DB accordingly
  try {
    Validator.checkAccountTypeEquals('individual', 'individual');
    const amount = JSON.parse(JSON.stringify(config.account_minimum_transfer));
    const reqBalance = 300;
    Validator.balanceGreaterThan(amount, reqBalance);
    next();
  } catch (err) {
    next(err);
  }
}
