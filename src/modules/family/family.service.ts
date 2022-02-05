/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as dal from "./family.dal.js";

// Create family account
export async function createNewFamilyAccount(payload: object): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic

    const family_account_datails = await dal.createFamilyAccount(payload);
    return family_account_datails;
}

// Get family account by ID - FULL
export async function getFamilyAccountByIdFull(family_id: number): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic
    
    const family_account_full = await dal.getFamilyAccountByIdFull(family_id);
    return family_account_full;
}

// Get family account by ID - SHORT
export async function getFamilyAccountByIdShort(family_id: number): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic
    
    const family_account_short = await dal.getFamilyAccountByIdShort(family_id);
    return family_account_short;
}

// Add individuals to family account
export async function addIndividualsToFamily(family_id: number, payload: object): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic
    
    const family_account = await dal.addIndividualsToFamily(family_id, payload);
    return family_account;
}

// Delete individuals from family account
export async function deleteIndividualsFromFamily(family_id: number, payload: object): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic
    
    const family_account = await dal.deleteIndividualsFromFamily(family_id, payload);
    return family_account;
}

// Transfer F2B
export async function transferFromFamilyToBusiness(payload: object): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic

    const results = await dal.transferFromFamilyToBusiness(payload);
    return results;
}

// Close family account by ID
export async function closeFamilyAccountById(family_id: number): Promise<any> {
    // TODO: call dal to create new family account
    //       add validations and business logic
    
    const results = await dal.closeFamilyAccountById(family_id);
    return results;
}