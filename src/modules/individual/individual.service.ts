/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IIndividualAccount } from "./individual.model";
import * as dal from "./individual.dal.js";
import { IChangeStatus } from "../../types/types";

// Create an individual account
export async function createNewIndividualAccount(payload: IIndividualAccount): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations

    const individual_account = await dal.createIndividualAccount(payload);
    return individual_account;
}

// Get individual account by ID
export async function getIndividualAccountById(idToRead: number): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations
    
    const individual_account = await dal.getIndividualAccountById(idToRead);
    return individual_account;
}

// Activate/Deactivate accounts
export async function changeAccountStatus(payload: IChangeStatus): Promise<any> {
    // TODO: call dal to create new individual account
    //       add validations and business logic
    
    const accounts_statuses = await dal.changeAccountStatus(payload);
    return accounts_statuses;
}