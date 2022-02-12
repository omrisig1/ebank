/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import * as Validator from '../validations/validator.js'; 
import config from "../../config.json";
import { account_type } from '../types/types.js';

export async function createIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.body,['individual_id','first_name','last_name','currency']);
    Validator.isValNumeric(req.body.individual_id, "individual_id");
    //add validation - config.individual.MIN_INDIVIDUAL_ID_NUM
    Validator.stringLengthAtLeast(req.body.individual_id,"individual id",config.individual.INDIVIDUAL_ID_DIGITS);
    await Validator.IndividualIDUnique(req.body.individual_id,"individual id");
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

export async function getIndividualMiddle(req: Request, res: Response, next: NextFunction) : Promise<void>{
    Validator.mandatoryFieldExists(req.params,['id']);
    Validator.isValNumeric(req.params.id, "id");
    await Validator.isAccountExists(Number(req.params.id)); 
    await Validator.checkAccountTypeEquals(Number(req.params.id),[account_type.INDIVIDUAL]);
    next();
    /*
    1.2 get individual account:
	1.2.1 mandatory fields:
		1.2.1.1 primary_id
	1.2.2 numeric primary_id
    */
}

