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

export function inFamily(accounts : string[] , id: string, family_id: number): boolean{
  if(accounts.includes(id)) {
    return true;
  }
  throw new validationException(400, `Account ${id} is not part of the given family (${family_id}).`);
}

export function accountActive(status: number | boolean | undefined, id_to_check: number) : boolean|Error{
  if (Number(status) === account_status.ACTIVE) {
    return true;
  }
  throw new validationException(400, `Account ${id_to_check} is not active`);
}

// export function isExists(val: any ) : boolean|Error{
//   if (val) {
//     return true;
//   }
//   throw new Error('account does not exists');
// }

export async function isAccountExists(account_id: number) : Promise<boolean | Error>{
  const account : IAccount = await Util.getAccountById(account_id)
  if(account) {
    return true;
  }
  throw new validationException(400, `Account ${account_id} doesn't exist.`)
}

// export function NumberEquals(num : string | number, than: string | number) : boolean{
//   if(Number(num) === Number(than)) {
//     return true;
//   }
//   throw new validationException(400, `${num} should be equal to ${than}.`)
// }
export function NumberEquals(value_field_tuples_got: [value: string | number, field: string | number], value_field_tuples_expected: [value: string | number, field: string | number]) : boolean{
  const value_got = value_field_tuples_got[0];
  const field_got = value_field_tuples_got[1]; 
  const value_expected = value_field_tuples_expected[0];
  const field_expected = value_field_tuples_expected[1]; 

  if(Number(value_got) === Number(value_expected)) {
    return true;
  }
  throw new validationException(400, `${field_got} should be equal to ${field_expected}.`)
}


// export function NumberGreaterThan(num : string | number, than: string | number) : boolean{
//   if(Number(num) > Number(than)) {
//     return true;
//   }
//   throw new Error("should be greather");
// }

export function NumberLessThan(value_field_tuples_got: [value: string | number, field: string | number], value_field_tuples_expected: [value: string | number, field: string | number]) : boolean{
  const value_got = value_field_tuples_got[0];
  const field_got = value_field_tuples_got[1]; 
  const value_expected = value_field_tuples_expected[0];
  const field_expected = value_field_tuples_expected[1]; 

  if(Number(value_got) <= Number(value_expected)) {
    return true;
  }
  throw new validationException(400, `${field_got} should be less than to ${field_expected}.`)
}


export function isPositive(num: string, field_checked: string) :boolean{
  if(Number(num) > 0) {
    return true;
  }
  throw new validationException(400,`${field_checked} should be positive.`);
}

export async function IndividualIDUnique(str: string , field_checked: string) : Promise<boolean | never>{
  const result = await individual_dal.getIndividualsByIndividualsIds([str]);
  if (result && result.length>0) {
    throw new validationException(400,`${field_checked} ${str} should be positive.`);
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
        throw new validationException(400,`mandatory field ${fieldName} is missing.`);
      }
    }
  }
  else{
    throw new validationException(400,'input is not an object');
  }
  return true;
}

export function isValNumeric(val: string | number |undefined, field_checked: string) : boolean|never{
  if (val && Number(val)) {
    return true;
  }
  throw new validationException(400,`Field ${field_checked} is not numeric`);
}

export function stringLengthAtLeast(val: string, field_checked: string, expected_length: number) :boolean|Error {
  if (stringNotEmpty(val) && val.length >= expected_length) {
    return true;
  }
  throw new validationException(400,`Field ${field_checked} should be of length ${expected_length}.`);
}

// export function stringLengthEquals(val: string, length: number) :boolean|Error{
//   if (stringNotEmpty(val) && val.length === length) {
//     return true;
//   }
//   throw new Error('string length error');
// }

// export function transferSizeSmallerThan(accountType: string, amount: string): boolean | Error{
//   const types = JSON.parse(JSON.stringify(config.account_minimum_transfer));
//   if (isValNumeric(amount) && Number(types[accountType]) <= Number(amount)) {
//     return true;
//   }
//   throw new Error('trasnfer amount exceeds account type permition error');
// }

export async function checkAccountTypeEquals(account_id: number, accounts_to_be_equal: string[]) : Promise<boolean | Error>{
  let account_type_param: string = "";
  if(await getIndividualByAccountId(account_id)) account_type_param = account_type.INDIVIDUAL;
  if(await getBusinessByAccountId(account_id)) account_type_param = account_type.BUSINESS;
  if(await getFamilyByAccountId(account_id)) account_type_param = account_type.FAMILY;

  if (accounts_to_be_equal.includes(account_type_param)) {
    return true;
  }
  throw new validationException(400, `Expected account type of ${accounts_to_be_equal}, but got ${account_type_param}.`)
}

// export function checkAccountTypeNotEquals(stringA: string, stringB: string) : boolean|Error{
//   if (stringA !== stringB) {
//     return true;
//   }
//   throw new Error('account of not proper type');
// }

export function checkAccountCurrencyEquals(value_field_tuples_got: [value: string , field: string], value_field_tuples_expected: [value: string, field: string]) : boolean|Error{
  const value_got = value_field_tuples_got[0];
  const field_got = value_field_tuples_got[1]; 
  const value_expected = value_field_tuples_expected[0];
  const field_expected = value_field_tuples_expected[1]; 

  if (value_got === value_expected) {
    return true;
  }
  throw new validationException(400, `${field_expected}(${value_expected}) should be equal to ${field_got}(${value_got})`);
}

export function checkAccountCurrencyNotEquals(value_field_tuples_got: [value: string , field: string], value_field_tuples_expected: [value: string, field: string]) : boolean|Error{
  const value_got = value_field_tuples_got[0];
  const field_got = value_field_tuples_got[1]; 
  const value_expected = value_field_tuples_expected[0];
  const field_expected = value_field_tuples_expected[1]; 

  if (value_got !== value_expected) {
    return true;
  }
  throw new validationException(400, `${field_expected}(${value_expected}) should be different from ${field_got}(${value_got}).`);
}

export function balanceGreaterThan(balance: string | number, balance_field: string, minimum: string | number, minimum_field: string) : boolean|Error{
  if (isValNumeric(balance,balance_field) && isValNumeric(minimum,minimum_field) && Number(balance) >= Number(minimum)) {
    return true;
  }
  throw new validationException(400,`${balance_field} should be greater than ${minimum_field}.`);
}

export function currencyIsValid(currency: string) : boolean | Error{
  if (config.currencies.includes(currency)) {
    return true;
  }
  throw new validationException(400,`Invalid currency, got ${currency} and support only: ${config.currencies}.`);
}

export function accountStatusNotEquals(statusA: string, statusB: string) : boolean | Error{
  if (statusA.toUpperCase() !== statusB.toUpperCase()) {
    return true;
  }
  throw new validationException(400, `At least one of the provided accounts has equal status as the procided action.`);
}
export function accountStatusEquals(value_field_tuples_got: [status_value_got: number , field: string], value_field_tuples_expected: [status_value_expected: number, field: string]) : boolean | Error{
  const status_value_got = value_field_tuples_got[0];
  const field_got = value_field_tuples_got[1]; 
  const status_value_expected = value_field_tuples_expected[0];
  const field_expected = value_field_tuples_expected[1]; 

  if (status_value_got == status_value_expected) {
    return true;
  }
  throw new validationException(400, `${field_got} should be ${field_expected} but got ${status_value_got}.`);
}