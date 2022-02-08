/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IBusinessAccount } from "./business.model";
import * as dal from "./business.dal.js";
import { ITranser } from "../../types/types";
import * as util from "../utils.dal.js";
// Create an business account
export async function createNewBusinessAccount(payload: IBusinessAccount): Promise<any> {
    // TODO: call dal to create new business account
    //       add validations
    
    const business_account = await dal.createBusinessAccount(payload);
    return business_account;
}

// Get business account by ID
export async function getBusinessAccountById(idToRead: number): Promise<any> {
    // TODO: call dal to create new business account
    //       add validations
    
    const business_account = await dal.getBusinessAccountByAccountId(idToRead);
    return business_account;
}

// Transfer B2B/B2I (same currency)
export async function transferSameCurrency(payload: ITranser): Promise<any> {
    // TODO: call dal to create new business account
    //       add validations and logic
    //       check if destination account is business or individual

    const results = await util.updateBalance(Number(payload.source_account), Number(payload.amount));
    // const results = await util.updateBalance(payload.destination,amount);

    // const results = await util.logTrasnfer(payload);

    return results;
}

// Transfer B2B (different currency)
export async function transferDifferentCurrency(payload: ITranser): Promise<any> {
    // TODO: call dal to create new business account
    //       add validations and logic
    //       check if destination account is business or individual
    //       add business logic for FX rate - use the module from getRate() from promises assignment.
    
    const results = await util.updateBalance(Number(payload.source_account), Number(payload.amount));
    // const results = await util.updateBalance(payload.destination,amount);

    // const results = await util.logTrasnfer(payload);
    return results;
}
