/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IIndividualAccount } from "./individual.model";
import dal from "./individual.dal.js";
import Util from "../utils.dal.js";
import { account_status, ITransfer, simple_transfer } from "../../types/types.js";
import { IFamilyAccount } from "../family/family.model.js";
import family_dal from "../family/family.dal.js";

class IndividualService {
    // Create an individual account
    async  createNewIndividualAccount(payload: IIndividualAccount): Promise<IIndividualAccount|undefined> {
        payload.balance = payload.balance? payload.balance : 0;
        payload.status_id = account_status.ACTIVE;
        const individual_account = await dal.createIndividualAccount(payload);
        return individual_account;
    }

    // Get individual account by ID
    async  getIndividualAccountByAccountId(idToRead: number): Promise<IIndividualAccount|undefined> {
        const individual_account = await dal.getIndividualAccountByAccountId(idToRead);
        return individual_account;
    }


    async  transferFromIndividualToFamily(payload: ITransfer): Promise<any> {
        const accounts1: IIndividualAccount[] = await dal.getIndividualsByAccountsIds([Number(payload.source_account)]);
        const accounts2: IFamilyAccount[] = await family_dal.getFamilyAccountsByAccountIDS([(Number(payload.destination_account))]);
        const source_acc = accounts1.find((acc)=> acc.account_id == Number(payload.source_account));
        const destination_acc = accounts2.find((acc)=> acc.account_id == Number(payload.destination_account));
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

}

const S = new IndividualService();
export default S;
