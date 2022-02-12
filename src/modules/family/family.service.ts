/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IAddIndividualsToFamily,
  ICreateFamilyAccount,
  IRemoveIndividualsToFamily,
  ITransfer,
  simple_transfer,
  account_status,
} from '../../types/types.js';
import * as individual_dal from "../individual/individual.dal.js";
import * as buisness_dal from "../business/business.dal.js";
import * as dal from "./family.dal.js";
import * as util_dal from "../utils.dal.js";
import { IFamilyAccount } from "./family.model.js";
import { IIndividualAccount } from "../individual/individual.model.js";
import * as Validator from '../../validations/validator.js';
import { IBusinessAccount } from "../business/business.model.js";
import config from '../../../config.json';


// Create family account
export async function createNewFamilyAccount(payload: ICreateFamilyAccount): Promise<IFamilyAccount | undefined> {
    // change owners ids and amounts to numbers
    const owners = payload.owners.map(owner=> [Number(owner[0]),Number(owner[1])] as [number,number]);
    // sum all individuals ammounts 
    let family_new_balance = owners.reduce((total,current)=> {return total + current[1]},0);
    const new_family: IFamilyAccount = {
        currency: payload.currency,
        balance: 0, // initial balnce just for create
        status_id: account_status.ACTIVE,
        context: payload.context
    }

    // get individual accounts
    const individual_account_ids = payload.owners.map((ind_acc)=> (ind_acc[0]));
    const individual_accounts = await individual_dal.getIndividualsByAccountsIds(individual_account_ids);

    // generate list of tuples with ids and new balance to update - for adding individuals to family
    const individuals_new_balance = generateIndividualsNewBalancesList(individual_accounts, payload.owners);
    
    // create new family
    // and update each individual's balance (subtract the amount from his balance)
    // and update the family balance by the sum of individual's amounts from payload
    // and add owners to this family
    const full_family_account = await dal.createFamilyAccount(new_family, family_new_balance, individuals_new_balance as [string,string][]);

    // give dal the owners to add to the family account
    // let family_account_owners: [family_account_id: string,individual_account_id: string][] = [];
    // for (const owner of payload.owners) {
    //     family_account_owners.push([String(family_account_without_owners.account_id),owner[0]]);
    // }
    //const full_family_account: IFamilyAccount = await dal.addFamilyOwners(family_account_owners,"full");

    return full_family_account;
}

// Get family account by ID - FULL/SHORT
export async function getFamilyAccountById(family_id: number, details_level: string = "full"): Promise<IFamilyAccount | undefined> {
    const family_account_by_details = await dal.getFamilyAccountByAccountId(family_id, details_level);
    return family_account_by_details;
}

// Add individuals to family account - return FULL/SHORT
export async function addIndividualsToFamily(family_id: number, details_level: string = "full", payload: IAddIndividualsToFamily): Promise<IFamilyAccount> {
    // get individual accounts as list by the tuples list
    // get full family account
    const full_family_account: IFamilyAccount = await dal.getFamilyAccountByAccountId(family_id, "full");
    
    //check individual account not already part of family
    let owners_account_number_list = (full_family_account.owners?.map((owner)=>  (owner as IIndividualAccount).account_id)) as number[];
    if(owners_account_number_list && owners_account_number_list != undefined){
        payload.individuals_to_add = payload.individuals_to_add.filter((individual)=>Number(individual[0]) in owners_account_number_list);
    }

    const individual_accounts = await getIndividualAccountsByTuplesList(payload.individuals_to_add);
    // get only active individual accounts from payload
    const only_active_individuals = individual_accounts.filter(ind_acc=> ind_acc.status_id === account_status.ACTIVE);

    let active_individuals_amounts: [string,string][] = [];
    only_active_individuals.forEach((active)=> {
        active_individuals_amounts = payload.individuals_to_add.filter((individual)=> individual[0] === String(active.account_id));
    });
    // sum all active individuals ammounts 
    let amounts_sum = active_individuals_amounts.reduce((total,current)=> total + Number(current[1]),0);
    const family_new_balance = full_family_account.balance + amounts_sum;

    // generate list of tuples with ids and new balance to update - for adding individuals to family
    const individuals_new_balance = generateIndividualsNewBalancesList(only_active_individuals, payload.individuals_to_add);
    
    // update each active individual's balance (subtract the amount from his balance)
    // update the family balance by the sum of active individual's amounts from payload
    const family_account_by_details = await dal.addFamilyOwners(family_id, family_new_balance, individuals_new_balance as [string,string][], details_level);

    // add active individuals to family account
    // let family_account_owners: [family_account_id: string,individual_account_id: string][] = [];
    // for (const active_individual of only_active_individuals) {
    //         family_account_owners.push([String(family_id),String(active_individual.account_id)]);
    // }
    // const family_account_by_details = await dal.addFamilyOwners(family_account_owners,details_level);
    return family_account_by_details as IFamilyAccount;
}

// Delete individuals from family account - return FULL/SHORT
export async function deleteIndividualsFromFamily(family_id: number, details_level: string = "full", payload: IRemoveIndividualsToFamily): Promise<IFamilyAccount | undefined> {
    // get full family account
    const full_family_account: IFamilyAccount = await dal.getFamilyAccountByAccountId(family_id, "full");
    // sum all individuals ammounts
    const amounts_sum = payload.individuals_to_remove.reduce((total,current)=> total + Number(current[1]),0);

    const family_new_balance = full_family_account.balance - amounts_sum;

    // check if all family account owners will be removed
    if(payload.individuals_to_remove.length === full_family_account.owners?.length){
        // the total amounts of the removed owners can result in up to a zero amount, but not go below 0.
        if(family_new_balance < 0){
            return undefined;
        }
    } else {
        // make sure a minimum allowed balance (5000) is being kept after the removal.
        if(family_new_balance < config.family.MIN_BALANCE){
            return undefined;
        }
    }

    // get individual accounts as list by the tuples list
    const individual_accounts = await getIndividualAccountsByTuplesList(payload.individuals_to_remove);

    // generate list of tuples with ids and new balance to update - for removing individuals from family
    const individuals_new_balance = generateIndividualsNewBalancesListForRemove(individual_accounts, payload.individuals_to_remove);

    // update each individual's balance (add the amount to his balance)
    // update the family balance by the sum of individual's amounts from payload
    const owners_ids = payload.individuals_to_remove.map(individual=> individual[0]);

    const family_account_by_details = await dal.deleteIndividualsFromFamily(family_id, family_new_balance, individuals_new_balance as [string,string][], owners_ids, details_level);

    // remove individuals from family account
    // const family_account_by_details = await dal.deleteIndividualsFromFamily(family_id, owners_ids, details_level);
    return family_account_by_details;
}

// Transfer F2B
export async function transferFromFamilyToBusiness(payload: ITransfer): Promise<any> {
    const accounts1: IFamilyAccount[] = await dal.getFamilyAccountsByAccountIDS([Number(payload.source_account)]);
    Validator.NumberEquals(accounts1.length, 1);
    const accounts2: IBusinessAccount[] = await buisness_dal.getBusinessesByAccountsIds([(payload.destination_account)]);
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

    const results = await util_dal.multiTransfer([simple_transfer1,simple_transfer2]);
    return results;
}

// Close family account by ID
export async function closeFamilyAccountById(account_id: number): Promise<number | undefined> {
    const family = await dal.getFamilyAccountByAccountId(account_id, 'short');
    if (Array.isArray(family.owners) && family.owners.length > 0) return undefined;
    await util_dal.changeAccountStatus([account_id.toString()], account_status.INACTIVE.toString());
    return account_id;
  }


// ** Helper functions for family service **

// get individual accounts as list by the tuples list
export async function getIndividualAccountsByTuplesList(ids_amounts_list: [string,string][]): Promise<IIndividualAccount[]> {
    const individual_account_ids = ids_amounts_list.map((ind_acc)=> (ind_acc[0]));
    const individual_accounts = await individual_dal.getIndividualsByAccountsIds(individual_account_ids);
    return individual_accounts;
}

// generate list of tuples with ids and new balance to update - for adding individuals to family
export function  generateIndividualsNewBalancesList(individual_accounts: IIndividualAccount[], ids_amounts_list: [string,string][]): ([string, string] | undefined)[] {
    const individuals_new_balance = individual_accounts.map((individual_account)=> {
        for (const owner of ids_amounts_list) {
             if(String(individual_account.account_id) === owner[0]){
                return [String(individual_account.account_id),String(individual_account.balance - Number(owner[1]))] as [string,string]
            }
        } 
    });
    return individuals_new_balance;
}

// generate list of tuples with ids and new balance to update - for removing individuals from family
export function  generateIndividualsNewBalancesListForRemove(individual_accounts: IIndividualAccount[], ids_amounts_list: [string,string][]): ([string, string] | undefined)[] {
    const individuals_new_balance = individual_accounts.map((individual_account)=> {
        for (const owner of ids_amounts_list) {
             if(String(individual_account.account_id) === owner[0]){
                return [String(individual_account.account_id),String(individual_account.balance + Number(owner[1]))] as [string,string]
            }
        } 
    });
    return individuals_new_balance;
}

