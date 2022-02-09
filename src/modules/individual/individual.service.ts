/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IIndividualAccount } from "./individual.model";
import * as dal from "./individual.dal.js";
import * as util from "../utils.dal.js";
import * as Validator from "../../validations/validator.js";
import { account_status, IChangeStatus } from "../../types/types";

// Create an individual account
export async function createNewIndividualAccount(payload: IIndividualAccount): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations
    // no buisness validations
    payload.balance = payload.balance? payload.balance : 0;
    payload.status_id = account_status.ACTIVE;
    const individual_account = await dal.createIndividualAccount(payload);
    return individual_account;
}

// Get individual account by ID
export async function getIndividualAccountByAccountId(idToRead: number): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations
    //no buisness validations
    const individual_account = await dal.getIndividualAccountByAccountId(idToRead);
    return individual_account;
}

// Activate/Deactivate accounts
export async function changeAccountStatus(payload: IChangeStatus): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations and business logic
    const accounts = await util.getAccountsByIds(payload.list_of_accounts);
    Validator.NumberEquals(accounts.length, payload.list_of_accounts.length);
    const accounts_statuses = await util.changeAccountStatus(payload.list_of_accounts, payload.action);
    return accounts_statuses;
}



