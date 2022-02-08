/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IAddIndividualsToFamily, IRemoveIndividualsToFamily, ITransfer } from "../../types/types.js";
import * as dal from "./family.dal.js";

// Create family account
// export async function createNewFamilyAccount(payload: ICreateFamilyAccount): Promise<any> {
//     // TODO: call dal to create new family account
//     //       add validations and business logic

//     const family_account_datails = await dal.createFamilyAccount(payload);
//     return family_account_datails;
// }

// Get family account by ID - FULL/SHORT
export async function getFamilyAccountById(family_id: number, details_level: string = "full"): Promise<any> {
    // TODO: call dal to get family account
    //       add validations and business logic
    //       and return family model by the details_level
    
    const family_account_full = await dal.getFamilyAccountById(family_id, details_level);
    return family_account_full;
}

// Add individuals to family account - return FULL/SHORT
export async function addIndividualsToFamily(family_id: number, details_level: string = "full", payload: IAddIndividualsToFamily): Promise<any> {
    // TODO: call dal to add individuals to family account
    //       add validations and business logic
    //       and return family model by the details_level

    const family_account = await dal.addIndividualsToFamily(family_id, details_level, payload);
    return family_account;
}

// Delete individuals from family account - return FULL/SHORT
export async function deleteIndividualsFromFamily(family_id: number, details_level: string = "full", payload: IRemoveIndividualsToFamily): Promise<any> {
    // TODO: call dal to delete individuals from family account
    //       add validations and business logic
    //       and return family model by the details_level
    
    const family_account = await dal.deleteIndividualsFromFamily(family_id, details_level, payload);
    return family_account;
}

// Transfer F2B
export async function transferFromFamilyToBusiness(payload: ITransfer): Promise<any> {
    // TODO: call dal to transfer money from family to business
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