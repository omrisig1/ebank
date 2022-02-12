/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import config from "../../config.json";
import * as individual_dal from "../modules/individual/individual.dal.js";
import validationException from "../exceptions/validation-exception.js";
import IAccount from "../modules/account.model";
import { getBusinessByAccountId } from "../modules/business/business.dal.js";
import { getFamilyByAccountId } from "../modules/family/family.dal.js";
import { getIndividualByAccountId } from "../modules/individual/individual.dal.js";
import { account_status, account_type } from '../types/types.js';
import * as Util from '../modules/utils.dal.js';

export function inFamily(accounts : string[] , id: string): boolean{
  if(accounts.includes(id)) {
    return true;
  }
  throw new Error('account not part of family');}

export function accountActive(status: number | boolean | undefined) : boolean|Error{
  if (Number(status) === account_status.ACTIVE) {
    return true;
  }
  throw new Error('account is not active');
}

export function isExists(val: any ) : boolean|Error{
  if (val) {
    return true;
  }
  throw new Error('account does not exists');
}

export async function isAccountExists(account_id: number) : Promise<boolean | Error>{
  const account : IAccount = await Util.getAccountById(account_id)
  if(account) {
    return true;
  }
  throw new validationException(400, `Account ${account_id} doesn't exist.`)
}

export function NumberEquals(num : string | number, than: string | number) : boolean{
  if(Number(num) === Number(than)) {
    return true;
  }
  throw new Error(`${num} should be equal to ${than}`);
}

export function NumberNotEquals(num : string | number, than: string | number) : boolean{
  if(Number(num) !== Number(than)) {
    return true;
  }
  throw new Error(`${num} should not be equal to ${than}`);
}

export function NumberGreaterThan(num : string | number, than: string | number) : boolean{
  if(Number(num) > Number(than)) {
    return true;
  }
  throw new Error("should be greather");
}

export function NumberLessThan(num : string | number, than: string | number) : boolean{
  if(Number(num) <= Number(than)) {
    return true;
  }
  throw new Error("should be less then");
}


export function isPositive(num:string) :boolean{
  if(Number(num) > 0) {
    return true;
  }
  throw new Error("amount should be positive");
}

export async function IndividualIDUnique(str:string) : Promise<boolean | never>{
  const result = await individual_dal.getIndividualsByIndividualsIds([str]);
  if (result && result.length>0) {
    throw new Error('individual ID already exists');
  }
  return true;
}

export function stringNotEmpty(str: string):boolean|''{
  if (str && typeof str === 'string' && str !== '') {
    return true;
  }
  throw new Error('value is not a string');
}

export function mandatoryFieldExists(object: object, fieldNames: string[]) : boolean|never{
  if(typeof object ==='object'){
    for (const fieldName of fieldNames) {
      if (!(fieldName in object)) {
        throw new Error('mandatory field missing');
      }
    }
  }
  else{
    throw new Error('input is not an object');
  }
  return true;
}

export function isValNumeric(val: string | number |undefined) : boolean|never{
  if (val && Number(val) || (val === 0 || val === '0')) {
    return true;
  }
  throw new Error(`value ${val} is not numeric`);
}

export function stringLengthAtLeast(val: string, length: number) :boolean|Error {
  if (stringNotEmpty(val) && val.length >= length) {
    return true;
  }
  throw new Error('string length error');
}

export function stringLengthEquals(val: string, length: number) :boolean|Error{
  if (stringNotEmpty(val) && val.length === length) {
    return true;
  }
  throw new Error('string length error');
}

// export function transferSizeSmallerThan(accountType: string, amount: string): boolean | Error{
//   const types = JSON.parse(JSON.stringify(config.account_minimum_transfer));
//   if (isValNumeric(amount) && Number(types[accountType]) <= Number(amount)) {
//     return true;
//   }
//   throw new Error('trasnfer amount exceeds account type permition error');
// }

export async function checkAccountTypeEquals(account_id: number, account_to_be_equal: string) : Promise<boolean | Error>{
  let account_type_param: string = "";
  if(await getIndividualByAccountId(account_id)) account_type_param = account_type.INDIVIDUAL;
  if(await getBusinessByAccountId(account_id)) account_type_param = account_type.BUSINESS;
  if(await getFamilyByAccountId(account_id)) account_type_param = account_type.FAMILY;

  if (account_type_param === account_to_be_equal) {
    return true;
  }
  throw new validationException(400, `Expected account type of ${account_to_be_equal}, but got ${account_type_param}.`)
}

export function checkAccountTypeNotEquals(stringA: string, stringB: string) : boolean|Error{
  if (stringA !== stringB) {
    return true;
  }
  throw new Error('account of not proper type');
}

export function checkAccountCurrencyEquals(stringA: string, stringB: string) : boolean|Error{
  if (stringA === stringB) {
    return true;
  }
  throw new Error('currency of different type');
}

export function balanceGreaterThan(num: string | number, than: string | number) : boolean|Error{
  if (isValNumeric(num) && isValNumeric(than) && Number(num) >= Number(than)) {
    return true;
  }
  throw new Error('insufficient balance');
}

export function currencyIsValid(currency: string) : boolean | Error{
  // const currencies = ['USD','EUR'];
  if (config.currencies.includes(currency)) {
    return true;
  }
  throw new Error('invalid currency');

}

export function accountStatusNotEquals(statusA: string, statusB: string) : boolean | Error{
  if (statusA !== statusB) {
    return true;
  }
  throw new Error('status type are NOT the same - cannot change');
}

export function accountStatusEquals(statusA: undefined | boolean | number, statusB: boolean | string | number) : boolean | Error{
  if (statusA == statusB) {
    return true;
  }
  throw new Error('status type are the same - cannot change');
}

export function emailValidation(email : string ){
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (emailRegexp.test(email)) {
    return true;
  }
  throw new Error('not valid email addtress');
}