import { Response, Request, NextFunction } from 'express';

export function changeStatusMiddle(req: Request, res: Response, next: NextFunction) : void {
    // Validator.mandatoryFieldExists(req.body,['list_of_accounts','status]);
    // accounts = util.getAccounts(req.body.list_of_accounts)
    //Validator.numberEquals(req.body.list_of_accounts.length, accounts.length);
    //for (const acc of accounts){
        // Validator.checkAccountTypeNotEquals(acc.type, 'family');
        // Validator.accountStatusNotEquals(acc.status, req.body.status);
    //}
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