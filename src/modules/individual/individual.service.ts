/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IIndividualAccount } from "./individual.model";
import * as dal from "./individual.dal.js";
import * as util from "../utils.dal.js";
import * as Validator from "../../validations/validator.js";
import { account_status, IChangeStatus, ITransfer, simple_transfer } from "../../types/types.js";
import { IFamilyAccount } from "../family/family.model.js";
import * as individual_dal from "../individual/individual.dal.js";
import * as family_dal from "../family/family.dal.js";

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


export async function transferFromIndividualToFamily(payload: ITransfer): Promise<any> {
    const accounts1: IIndividualAccount[] = await individual_dal.getIndividualsByAccountsIds([Number(payload.source_account)]);
    Validator.NumberEquals(accounts1.length, 1);
    const accounts2: IFamilyAccount[] = await family_dal.getFamilyAccountsByAccountIDS([(Number(payload.destination_account))]);
    const source_acc = accounts1.find((acc)=> acc.account_id == Number(payload.source_account));
    Validator.NumberEquals(accounts2.length, 1);
    const destination_acc = accounts2.find((acc)=> acc.account_id == Number(payload.destination_account));
    Validator.NumberLessThan(payload.amount, 5000);
    const simple_transfer1 : simple_transfer = {
        account_id: Number(payload.source_account),
        new_balance:Number(source_acc?.balance) - Number(payload.amount)
    }
    const simple_transfer2 : simple_transfer = {
        account_id: Number(payload.destination_account), 
        new_balance: Number(destination_acc?.balance) + Number(payload.amount)
    } 

    const results = await util.multiTransfer([simple_transfer1,simple_transfer2]);
    return results;
}


