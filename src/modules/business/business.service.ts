/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IBusinessAccount } from './business.model';
import * as business_dal from './business.dal.js';
import * as individual_dal from '../individual/individual.dal.js';
import * as util from '../utils.dal.js';
import * as Validator from '../../validations/validator.js';
import { account_status, ITransfer } from '../../types/types.js';
import fetch from 'node-fetch';
import IAccount from '../account.model.js';

// Create an business account
export async function createNewBusinessAccount(payload: IBusinessAccount): Promise<any> {
  // TODO: call dal to create new business account
  //       add validations
  //no buisness logic
  payload.black_list = payload.black_list? payload.black_list : false;
  payload.status_id = account_status.ACTIVE;
  
  const business_account = await business_dal.createBusinessAccount(payload);
  return business_account;
}

// Get business account by ID
export async function getBusinessAccountById(idToRead: number): Promise<any> {
  // TODO: call dal to create new business account
  //       add validations
  // np buisness logic
  const business_account = await business_dal.getBusinessAccountByAccountId(idToRead);
  return business_account;
}

// Transfer B2B/B2I (same currency)
// TODO: call dal to create new business account
//       add validations and logic
//       check if destination account is business or individual
export async function transferSameCurrency(payload: ITransfer): Promise<IAccount[]> {
  // buisness logic:
  // check source - Business
  const source_acc = await business_dal.getBusinessAccountByAccountId(Number(payload.source_account));
  Validator.isExists(source_acc);
  // check destination - Business or Individual
  const business_destination_acc = await business_dal.getBusinessAccountByAccountId(Number(payload.destination_account));
  const individual_destination_acc = await individual_dal.getIndividualAccountByAccountId(Number(payload.destination_account));
  if (!business_destination_acc || !individual_destination_acc) throw new Error('destination account not valid - can be B2B or B2I');

  // if destination is Business --> transfer B2B
  if (business_destination_acc) {
    if (source_acc.company_id == business_destination_acc.company_id) {
      Validator.NumberLessThan(payload.amount, 10000);
    } else {
      Validator.NumberLessThan(payload.amount, 1000);
    }
    return await util.transfer(payload, source_acc, business_destination_acc);
  }
  // destination is Individual --> transfer B2I
  return await util.transfer(payload, source_acc, individual_destination_acc);
}

// Transfer B2B (different currency)

export async function transferDifferentCurrency(payload: ITransfer): Promise<any> {
  //buisness logic:
  const accounts = await business_dal.getBusinessesByAccountsIds([(payload.source_account),(payload.destination_account)]);
  const source_acc = accounts.find((acc)=> acc.account_id == Number(payload.source_account));
  const destination_acc = accounts.find((acc)=> acc.account_id == Number(payload.destination_account));
  Validator.NumberEquals(accounts.length, 2);
  let json = await FX_exchange(source_acc as IBusinessAccount, destination_acc as IBusinessAccount);
  if('error' in (json as any)){
    return json;
  }
  const amount = Number((json as any).rates[(destination_acc as IBusinessAccount).currency]) * Number(payload.amount);
  if(source_acc?.company_id == destination_acc?.company_id){
    Validator.NumberLessThan(amount, 10000);
  }
  else{
    Validator.NumberLessThan(amount, 1000);
  }
  return await util.transfer(payload, source_acc as IBusinessAccount, destination_acc as IBusinessAccount);
}

async function FX_exchange(base:IBusinessAccount, target : IBusinessAccount) {
  const base_url = `http://api.exchangeratesapi.io/latest`;
  //fx_access_key
  const url = `${base_url}?base=${base?.currency}&symbols=${target?.currency}&access_key=7af0eb50172cf80363666a130fba9745`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
  
}