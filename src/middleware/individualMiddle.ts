/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 

export function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.body,['individual_id','first_name','last_name','currency']);
     Validator.isValNumeric(req.body.individual_id);
     Validator.stringLengthAtLeast(req.body.individual_id,7);
     Validator.IndividualIDUnique(req.body.individual_id as string);
    next();
    /*
    1.1 create individual account:
	1.1.1 mandatory fields:
		1.1.1.1 individual_id
		1.1.1.2 first_name
		1.1.1.3 last_name
		1.1.1.4 currency
		1.1.2 numeric individual_id
		1.1.3 unique individual_id
		1.1.4 individual_id length greater equal than 7
    */
}

export function getIndividualMiddle(req: Request, res: Response, next: NextFunction) : void{
     Validator.mandatoryFieldExists(req.param,['id']);
     Validator.isValNumeric(req.params.id);
    next();
    /*
    1.2 get individual account:
	1.2.1 mandatory fields:
		1.2.1.1 primary_id
	1.2.2 numeric primary_id
    */
}

