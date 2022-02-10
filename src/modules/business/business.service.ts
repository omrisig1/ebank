/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IBusinessAccount } from './business.model';
import * as dal from './business.dal.js';
import * as util from '../utils.dal.js';
import * as Validator from '../../validations/validator.js';
import { simple_transfer,account_status, ITransfer } from '../../types/types.js';
import fetch from 'node-fetch';
import config from '../../../config.json';

// Create an business account
export async function createNewBusinessAccount(payload: IBusinessAccount): Promise<any> {
  // TODO: call dal to create new business account
  //       add validations
  //no buisness logic
  payload.black_list = payload.black_list? payload.black_list : false;
  payload.status_id = account_status.ACTIVE;
  
  const business_account = await dal.createBusinessAccount(payload);
  return business_account;
}

// Get business account by ID
export async function getBusinessAccountById(idToRead: number): Promise<any> {
  // TODO: call dal to create new business account
  //       add validations
  // np buisness logic
  const business_account = await dal.getBusinessAccountByAccountId(idToRead);
  return business_account;
}

// Transfer B2B/B2I (same currency)
// TODO: call dal to create new business account
//       add validations and logic
//       check if destination account is business or individual
export async function transferSameCurrency(payload: ITransfer): Promise<any> {
  //buisness logic:
  const accounts = await dal.getBusinessesByAccountsIds([(payload.source_account),(payload.destination_account)]);
  Validator.NumberEquals(accounts.length, 2);
  const source_acc = accounts.find((acc)=> acc.account_id == Number(payload.source_account));
  const destination_acc = accounts.find((acc)=> acc.account_id == Number(payload.destination_account));
  if(source_acc?.company_id == destination_acc?.company_id){
    Validator.NumberLessThan(payload.amount, config.business.MAX_TRANS_B2B_SAME_COMPANY);
  }
  else{
    Validator.NumberLessThan(payload.amount, config.business.MAX_TRANS_B2B_DIF_COMPANY);
  }
  const simple_transfer1 : simple_transfer= 
  {account_id: Number(payload.source_account), 
    new_balance:Number(source_acc?.balance)-Number(payload.amount)
  } ;
  const simple_transfer2 : simple_transfer= 
  {account_id: Number(payload.destination_account), 
    new_balance:Number(destination_acc?.balance)+Number(payload.amount)
  } ;
  const results = await util.multiTransfer([simple_transfer1,simple_transfer2]);
  return results;
}

// Transfer B2B (different currency)

export async function transferDifferentCurrency(payload: ITransfer): Promise<any> {
  //buisness logic:
  const accounts = await dal.getBusinessesByAccountsIds([(payload.source_account),(payload.destination_account)]);
  const source_acc = accounts.find((acc)=> acc.account_id == Number(payload.source_account));
  const destination_acc = accounts.find((acc)=> acc.account_id == Number(payload.destination_account));
  Validator.NumberEquals(accounts.length, 2);
  let json = await FX_exchange(source_acc as IBusinessAccount, destination_acc as IBusinessAccount);
  if('error' in (json as any)){
    return json;
  }
  const amount = Number((json as any).rates[(destination_acc as IBusinessAccount).currency]) * Number(payload.amount);
  if(source_acc?.company_id == destination_acc?.company_id){
    Validator.NumberLessThan(amount, config.business.MAX_TRANS_B2B_FX_SAME_COMPANY);
  }
  else{
    Validator.NumberLessThan(amount, config.business.MAX_TRANS_B2B_FX_DIF_COMPANY);
  }
  const simple_transfer1 : simple_transfer= 
  {account_id: Number(payload.source_account), 
    new_balance:Number(source_acc?.balance)-Number(amount)
  } ;
  const simple_transfer2 : simple_transfer= 
  {account_id: Number(payload.destination_account), 
    new_balance:Number(destination_acc?.balance)+Number(amount)
  } ;
  const results = await util.multiTransfer([simple_transfer1,simple_transfer2]);
  return results;
}

async function FX_exchange(base:IBusinessAccount, target : IBusinessAccount) {
  const base_url = `http://api.exchangeratesapi.io/latest`;
  //fx_access_key
  const url = `${base_url}?base=${base?.currency}&symbols=${target?.currency}&access_key=7af0eb50172cf80363666a130fba9745`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
  
}