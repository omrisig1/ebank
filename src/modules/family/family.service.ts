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
import individual_dal from "../individual/individual.dal.js";
import buisness_dal from "../business/business.dal.js";
import dal from "./family.dal.js";
import Util from "../utils.dal.js";
import { IFamilyAccount } from "./family.model.js";
import { IIndividualAccount } from "../individual/individual.model.js";
import Validator from '../../validations/validator.js';
import { IBusinessAccount } from "../business/business.model.js";
import config from '../../../config.json';
import IAccount from '../account.model.js';

class FamilyService {
   // Create family account
    async  createNewFamilyAccount(payload: ICreateFamilyAccount): Promise<IFamilyAccount | undefined> {
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
        const individuals_new_balance = this.generateIndividualsNewBalancesList(individual_accounts, payload.owners);
        
        // create new family
        // and update each individual's balance (subtract the amount from his balance)
        // and update the family balance by the sum of individual's amounts from payload
        // and add owners to this family
        const full_family_account = await dal.createFamilyAccount(new_family, family_new_balance, individuals_new_balance as [string,string][]);
        return full_family_account;
    }

    // Get family account by ID - FULL/SHORT
    async  getFamilyAccountById(family_id: number, details_level: string = "full"): Promise<IFamilyAccount | undefined> {
        const family_account_by_details = await dal.getFamilyAccountByAccountId(family_id, details_level);
        return family_account_by_details;
    }

    // Add individuals to family account - return FULL/SHORT
    async  addIndividualsToFamily(family_id: number, details_level: string = "full", payload: IAddIndividualsToFamily): Promise<IFamilyAccount|undefined> {
        // get individual accounts as list by the tuples list
        // get full family account
        const full_family_account: IFamilyAccount = await dal.getFamilyAccountByAccountId(family_id, "full");

        //check individual account not already part of family
        let owners_account_number_list = (full_family_account.owners?.map((owner)=>  (((owner as IIndividualAccount).account_id) as number).toString()));
        if(owners_account_number_list && owners_account_number_list != undefined){
            payload.individuals_to_add = payload.individuals_to_add.filter((individual)=>{
                return owners_account_number_list?.every((owner)=> owner != individual[0]);
            });
        }

        const individual_accounts = await this.getIndividualAccountsByTuplesList(payload.individuals_to_add);
        // get only active individual accounts from payload
        const only_active_individuals = individual_accounts.filter(ind_acc=> ind_acc.status_id === account_status.ACTIVE);
        if (only_active_individuals.length === 0) return undefined; // no active individuals to add

        let active_individuals_amounts: [string, string][] = [];
        only_active_individuals.forEach((active)=> {
            for (const individual of payload.individuals_to_add) {
                if(individual[0] === String(active.account_id)) {
                    active_individuals_amounts.push(individual);
                }
            }
        });

        // sum all active individuals ammounts 
        let amounts_sum = active_individuals_amounts.reduce((total,current)=> total + Number(current[1]),0);

        const family_new_balance = full_family_account.balance + amounts_sum;
        // generate list of tuples with ids and new balance to update - for adding individuals to family
        const individuals_new_balance = this.generateIndividualsNewBalancesList(only_active_individuals, payload.individuals_to_add);
        
        // update each active individual's balance (subtract the amount from his balance)
        // update the family balance by the sum of active individual's amounts from payload
        // add active individuals to family account
        const family_account_by_details = await dal.addFamilyOwners(family_id, family_new_balance, individuals_new_balance as [string,string][], details_level);
        return family_account_by_details as IFamilyAccount;
    }

    // Delete individuals from family account - return FULL/SHORT
    async  deleteIndividualsFromFamily(family_id: number, details_level: string = "full", payload: IRemoveIndividualsToFamily): Promise<IFamilyAccount | undefined> {
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
        const individual_accounts = await this.getIndividualAccountsByTuplesList(payload.individuals_to_remove);

        // generate list of tuples with ids and new balance to update - for removing individuals from family
        const individuals_new_balance = this.generateIndividualsNewBalancesListForRemove(individual_accounts, payload.individuals_to_remove);

        // update each individual's balance (add the amount to his balance)
        // update the family balance by the sum of individual's amounts from payload
        const owners_ids = payload.individuals_to_remove.map(individual=> individual[0]);

        // remove individuals from family account
        const family_account_by_details = await dal.deleteIndividualsFromFamily(family_id, family_new_balance, individuals_new_balance as [string,string][], owners_ids, details_level);
        return family_account_by_details;
    }

    // Transfer F2B
    async  transferFromFamilyToBusiness(payload: ITransfer): Promise<IAccount[]> {
        const source_acc: IFamilyAccount = await dal.getFamilyAccountByAccountId(Number(payload.source_account));
        const destination_acc: IBusinessAccount = await buisness_dal.getBusinessAccountByAccountId(Number(payload.destination_account));
        // const source_acc = accounts1.find((acc)=> acc.account_id == Number(payload.source_account));
        // const destination_acc = accounts2.find((acc)=> acc.account_id == Number(payload.destination_account));
        Validator.NumberLessThan([payload.amount,"amount"], [config.family.TRANS_F2B,`the maximum transfer from family to business (${config.family.TRANS_F2B})`]);
        const simple_transfer1 : simple_transfer = {
            account_id: Number(payload.source_account),
            new_balance:Number(source_acc?.balance) - Number(payload.amount)
        }
        const simple_transfer2 : simple_transfer = {
            account_id: Number(payload.destination_account), 
            new_balance: Number(destination_acc?.balance) + Number(payload.amount)
        } 

        const results = await Util.multiTransfer([simple_transfer1,simple_transfer2]);
        return results;
    }

    // Close family account by ID
    async  closeFamilyAccountById(account_id: number): Promise<number | undefined> {
        const family = await dal.getFamilyAccountByAccountId(account_id, 'short');
        if (Array.isArray(family.owners) && family.owners.length > 0) return undefined;
        await Util.changeAccountStatus([account_id.toString()], account_status.INACTIVE.toString());
        return account_id;
    }


    // ** Helper functions for family service **

    // get individual accounts as list by the tuples list
    async  getIndividualAccountsByTuplesList(ids_amounts_list: [string,string][]): Promise<IIndividualAccount[]> {
        const individual_account_ids = ids_amounts_list.map((ind_acc)=> (ind_acc[0]));
        const individual_accounts = await individual_dal.getIndividualsByAccountsIds(individual_account_ids);
        return individual_accounts;
    }

    // generate list of tuples with ids and new balance to update - for adding individuals to family
    generateIndividualsNewBalancesList(individual_accounts: IIndividualAccount[], ids_amounts_list: [string,string][]): ([string, string] | undefined)[] {
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
    generateIndividualsNewBalancesListForRemove(individual_accounts: IIndividualAccount[], ids_amounts_list: [string,string][]): ([string, string] | undefined)[] {
        const individuals_new_balance = individual_accounts.map((individual_account)=> {
            for (const owner of ids_amounts_list) {
                if(String(individual_account.account_id) === owner[0]){
                    return [String(individual_account.account_id),String(individual_account.balance + Number(owner[1]))] as [string,string]
                }
            } 
        });
        return individuals_new_balance;
    } 
}

const S = new FamilyService();
export default S;
