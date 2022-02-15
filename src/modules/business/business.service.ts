/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IBusinessAccount } from './business.model';
import business_dal from './business.dal.js';
import individual_dal from '../individual/individual.dal.js';
import Util from '../utils.dal.js';
import Validator from '../../validations/validator.js';
import { account_status, IDiffRate, ITransfer, simple_transfer } from '../../types/types.js';
import fetch from 'node-fetch';
import config from '../.././config.js';
import IAccount from '../account.model.js';

class BuisnessService {
  // Create an business account
    async createNewBusinessAccount(payload: IBusinessAccount): Promise<IBusinessAccount|undefined> {
      payload.black_list = payload.black_list ? payload.black_list : false;
      payload.status_id = account_status.ACTIVE;
      payload.balance = payload.balance? payload.balance : 0;
      const business_account = await business_dal.createBusinessAccount(payload);
      return business_account;
  }

  // Get business account by ID
  async getBusinessAccountById(idToRead: number): Promise<IBusinessAccount> {
    const business_account = await business_dal.getBusinessAccountByAccountId(idToRead);
    return business_account;
  }

  // Transfer B2B/B2I (same currency)
  async transferSameCurrency(payload: ITransfer): Promise<IAccount[]> {
    // buisness logic:
    // check source - Business
    const source_acc = await business_dal.getBusinessAccountByAccountId(Number(payload.source_account));
    // check destination - Business or Individual
    const business_destination_acc = await business_dal.getBusinessAccountByAccountId(Number(payload.destination_account));

    const individual_destination_acc = await individual_dal.getIndividualAccountByAccountId(Number(payload.destination_account));

    // if destination is Business --> transfer B2B
    if (business_destination_acc) {
      if(config.TRASNFER_LIMIT_ON) {
        if (source_acc.company_id == business_destination_acc.company_id) {
          Validator.NumberLessThan([payload.amount,"amount"], [config.business.MAX_TRANS_B2B_SAME_COMPANY,`maximum transfer in the same compamy (${config.business.MAX_TRANS_B2B_SAME_COMPANY})`]);
        } else {
          Validator.NumberLessThan([payload.amount,"amount"], [config.business.MAX_TRANS_B2B_DIF_COMPANY,`maximum transfer to different compamy (${config.business.MAX_TRANS_B2B_DIF_COMPANY})`]);
        }
      }
      return await Util.transfer(payload, source_acc, business_destination_acc);
    }
    // destination is Individual --> transfer B2I
    return await Util.transfer(payload, source_acc, individual_destination_acc);
  }
  
  // Transfer B2B (different currency)
  async  transferDifferentCurrency(payload: ITransfer): Promise< any> {
    //buisness logic:
    const accounts = await business_dal.getBusinessesByAccountsIds([(payload.source_account),(payload.destination_account)]);
    const source_acc = accounts.find((acc)=> acc.account_id == Number(payload.source_account));
    const destination_acc = accounts.find((acc)=> acc.account_id == Number(payload.destination_account));
    let json = await this.FX_exchange(source_acc as IBusinessAccount, destination_acc as IBusinessAccount);
    if('error' in (json as any)){
      return json;
    }
    const rate = (json as any).rates[(destination_acc as IBusinessAccount).currency]; 

    const new_amount = ((json as any).rates[(destination_acc as IBusinessAccount).currency] * Number(payload.amount)).toString();
    const simple_transfer1: simple_transfer = {
      account_id: Number(payload.source_account),
      new_balance: Number(source_acc?.balance) - Number(payload.amount),
    };
    const simple_transfer2: simple_transfer = {
      account_id: Number(payload.destination_account),
      new_balance: Number(destination_acc?.balance) + Number(new_amount),
    };
    if(config.TRASNFER_LIMIT_ON){
      if(source_acc?.company_id == destination_acc?.company_id){
        Validator.NumberLessThan([payload.amount,"amount"], [config.business.MAX_TRANS_B2B_FX_SAME_COMPANY,`maximum transfer in the same compamy and different currency(${config.business.MAX_TRANS_B2B_FX_SAME_COMPANY})`]);
      }
      else{
        Validator.NumberLessThan([payload.amount,"amount"], [config.business.MAX_TRANS_B2B_FX_DIF_COMPANY,`maximum transfer to different compamy and different currency(${config.business.MAX_TRANS_B2B_FX_DIF_COMPANY})`]);
      }
    }
    let results = await Util.multiTransfer([simple_transfer1, simple_transfer2]);
    if(results[0]) {
      const results_obj: IDiffRate = {
        accounts: results,
        rate: rate as number
      }

      return results_obj;
    }
    return results;
  }

  async  FX_exchange(base:IBusinessAccount, target : IBusinessAccount) {
    const base_url = `http://api.exchangeratesapi.io/latest`;
    //fx_access_key
    const url = `${base_url}?base=${base?.currency}&symbols=${target?.currency}&access_key=7af0eb50172cf80363666a130fba9745`;
    let response = await fetch(url);
    let json = await response.json();
    return json;
    
  }
}

const S = new BuisnessService;
export default S;