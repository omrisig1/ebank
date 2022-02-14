/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import config from "../../config.json";
import validationException from "../exceptions/validation-exception.js";
import IAccount from "../modules/account.model";
import buisness_dal from "../modules/business/business.dal.js";
import family_dal from "../modules/family/family.dal.js";
import individual_dal from "../modules/individual/individual.dal.js";
import { account_status, account_type } from '../types/types.js';
import Util from '../modules/utils.dal.js';

class Validator {
    inFamily(accounts : string[] , id: string, family_id: number): boolean{
    if(accounts.includes(id)) {
      return true;
    }
    throw new validationException(400, `Account ${id} is not part of the given family (${family_id}).`);
  }
  
    accountActive(status: number | boolean | undefined, id_to_check: number) : boolean|Error{
    if (Number(status) === account_status.ACTIVE) {
      return true;
    }
    throw new validationException(400, `Account ${id_to_check} is not active`);
  }
  
  //   isExists(val: any ) : boolean|Error{
  //   if (val) {
  //     return true;
  //   }
  //   throw new Error('account does not exists');
  // }
  
   async  isAccountExists(account_id: number) : Promise<boolean | Error>{
    const account : IAccount = await Util.getAccountById(account_id)
    if(account) {
      return true;
    }
    throw new validationException(400, `Account ${account_id} doesn't exist.`)
  }
  
  //   NumberEquals(num : string | number, than: string | number) : boolean{
  //   if(Number(num) === Number(than)) {
  //     return true;
  //   }
  //   throw new validationException(400, `${num} should be equal to ${than}.`)
  // }
    NumberEquals(value_field_tuples_got: [value: string | number, field: string | number], value_field_tuples_expected: [value: string | number, field: string | number]) : boolean{
    const value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1]; 
  
    if(Number(value_got) === Number(value_expected)) {
      return true;
    }
    throw new validationException(400, `${field_got} should be equal to ${field_expected}.`)
  }
  
    NumberNotEquals(value_field_tuples_got: [value: string | number, field: string | number], value_field_tuples_expected: [value: string | number, field: string | number]) : boolean{
    const value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1];
  
    if(Number(value_got) !== Number(value_expected)) {
      return true;
    }
    throw new validationException(400, `${field_got} should be different from ${field_expected}.`)
  }
  
    NumberGreaterThan(num : string | number, than: string | number, field: string) : boolean{
    if(Number(num) > Number(than)) {
      return true;
    }
    throw new validationException(400, `Field ${field} - ${num} should be greater than ${than}.`);
  }
  
    NumberLessThan(value_field_tuples_got: [value: string | number, field: string | number], value_field_tuples_expected: [value: string | number, field: string | number]) : boolean{
    const value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1]; 
    if(Number(value_got) <= Number(value_expected)) {
      return true;
    }
    throw new validationException(400, `${field_got} should be less than to ${field_expected}.`)
  }
  
  
    isPositive(num: string, field_checked: string) :boolean{
    if(Number(num) > 0) {
      return true;
    }
    throw new validationException(400,`${field_checked} should be positive.`);
  }
  
   async  IndividualIDUnique(str: string , field_checked: string) : Promise<boolean | never>{
    const result = await individual_dal.getIndividualsByIndividualsIds([str]);
    if (result && result.length>0) {
      throw new validationException(400,`${field_checked} ${str} should be unique.`);
    }
    return true;
  }
  
    stringNotEmpty(str: string):boolean|''{
    if (str && typeof str === 'string' && str !== '') {
      return true;
    }
    throw new Error('value is not a string');
  }
  
    mandatoryFieldExists(object: object, fieldNames: string[]) : boolean|never{
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
  
  
  //   isValNumeric(val: string | number | undefined, field?: string): boolean | never;
  //   isValNumeric(val: string[] | number[], field?: string | string[]): boolean | never;
  //   isValNumeric(val: any, field?: string | string[]): boolean | never {
  //   if (Array.isArray(val) && (Array.isArray(field))) {
  //     for (const [i, v] of val.entries()) {
  //       if (!((v && Number(v)) || v === 0 || v === '0')) {
  //         throw new Error(`Field ${field[i]} value is not numeric`);
  //       }
  //     }
  //     return true;
  //   } else if (Array.isArray(val)){
  //     if (val.every((v) => (v && Number(v)) || v === 0 || v === '0')) return true;
  //     throw new Error(`Field ${field as string} include value that is not numeric`);
  //    }
  //   else if ((val && Number(val)) || val === 0 || val === '0') return true;
  //   throw new Error(`Field ${field as string} value is not numeric`);
  // }
    isValNumeric(val: string | number |undefined, field_checked: string) : boolean|never{
    if ((val && Number(val)) || val === 0 || val === '0') {
      return true;
    }
    throw new validationException(400,`Field ${field_checked} is not numeric`);
  }
  
    stringLengthAtLeast(val: string, field_checked: string, expected_length: number) :boolean|Error {
    if (this.stringNotEmpty(val) && val.length >= expected_length) {
      return true;
    }
    throw new validationException(400,`Field ${field_checked} should be of length ${expected_length}.`);
  }
  
  //   stringLengthEquals(val: string, length: number) :boolean|Error{
  //   if (stringNotEmpty(val) && val.length === length) {
  //     return true;
  //   }
  //   throw new Error('string length error');
  // }
  
  //   transferSizeSmallerThan(accountType: string, amount: string): boolean | Error{
  //   const types = JSON.parse(JSON.stringify(config.account_minimum_transfer));
  //   if (isValNumeric(amount) && Number(types[accountType]) <= Number(amount)) {
  //     return true;
  //   }
  //   throw new Error('trasnfer amount exceeds account type permition error');
  // }
  
   async  checkAccountTypeEquals(account_id: number, accounts_to_be_equal: string[]) : Promise<boolean | Error>{
    let account_type_param: string = "";
    if(await individual_dal.getIndividualByAccountId(account_id)) account_type_param = account_type.INDIVIDUAL;
    if(await buisness_dal.getBusinessByAccountId(account_id)) account_type_param = account_type.BUSINESS;
    if(await family_dal.getFamilyByAccountId(account_id)) account_type_param = account_type.FAMILY;
  
    if (accounts_to_be_equal.includes(account_type_param)) {
      return true;
    }
    throw new validationException(400, `Expected account type of ${accounts_to_be_equal}, but got ${account_type_param}.`)
  }
  
  //   checkAccountTypeNotEquals(stringA: string, stringB: string) : boolean|Error{
  //   if (stringA !== stringB) {
  //     return true;
  //   }
  //   throw new Error('account of not proper type');
  // }
  
    checkAccountCurrencyEquals(value_field_tuples_got: [value: string , field: string], value_field_tuples_expected: [value: string, field: string]) : boolean|Error{
    const value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1]; 
  
    if (value_got === value_expected) {
      return true;
    }
    throw new validationException(400, `${field_expected}(${value_expected}) should be equal to ${field_got}(${value_got})`);
  }
  
    checkAccountCurrencyNotEquals(value_field_tuples_got: [value: string , field: string], value_field_tuples_expected: [value: string, field: string]) : boolean|Error{
    const value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1]; 
  
    if (value_got !== value_expected) {
      return true;
    }
    throw new validationException(400, `${field_expected}(${value_expected}) should be different from ${field_got}(${value_got}).`);
  }
  
    balanceGreaterThan(balance: string | number, balance_field: string, minimum: string | number, minimum_field: string) : boolean|Error{
    if (this.isValNumeric(balance,balance_field) && this.isValNumeric(minimum,minimum_field) && Number(balance) >= Number(minimum)) {
      return true;
    }
    throw new validationException(400,`${balance_field} should be greater than ${minimum_field}.`);
  }
  
    currencyIsValid(currency: string) : boolean | Error{
    if (config.currencies.includes(currency)) {
      return true;
    }
    throw new validationException(400,`Invalid currency, got ${currency} and support only: ${config.currencies}.`);
  }
  
    accountStatusNotEquals(statusA: string, statusB: string) : boolean | Error{
    if (statusA.toUpperCase() !== statusB.toUpperCase()) {
      return true;
    }
    throw new validationException(400, `At least one of the provided accounts has equal status as the provided action.`);
  }
    accountStatusEquals(value_field_tuples_got: [status_value_got: number , field: string], value_field_tuples_expected: [status_value_expected: number, field: string]) : boolean | Error{
    const status_value_got = value_field_tuples_got[0];
    const field_got = value_field_tuples_got[1]; 
    const status_value_expected = value_field_tuples_expected[0];
    const field_expected = value_field_tuples_expected[1]; 
    if (status_value_got == status_value_expected) {
      return true;
    }
    const status_as_string = account_status[status_value_got];
    throw new validationException(400, `${field_got} should be ${field_expected} but it is ${status_as_string}.`);
  }
  
    emailValidation(email : string ){
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailRegexp.test(email)) {
      return true;
    }
    throw new validationException(400, `${email} is not valid email addtress`);
  }
  
    isTypeArray(val: any, field: string): boolean | never {
    if (Array.isArray(val)) {
      return true;
    }
      throw new validationException(400, `Field ${field} input should be array.`);
  }
    isTypeTuplesArray(list_of_accounts_tuples: [account_id: string,type: string][], field: string): boolean | never {
      this.isTypeArray(list_of_accounts_tuples, field);
      for (const account_tuple of list_of_accounts_tuples) {
        if(!this.isTypeArray(account_tuple, 'account tuple') || account_tuple.length !== 2){
          throw new validationException(400, `Field ${field} input should be array of tuples.`);
        }
      }
      return true;
  }
  
    isStatusExists(status: string): boolean | never {
    if (status.toUpperCase() in account_status) {
      return true;
    }
    throw new validationException(400, `Status ${status} not exists`);
  }
  
    isFamilyNotClosed(status: string, family_id: string): boolean | never {
    if (status.toUpperCase() === account_status[1]) {
      return true;
    }
    throw new validationException(400, `Family account ${family_id} already closed`);
  }

  checkAccountTypeByTypesList(types_list: string[],types_to_check: string[]){
    for (const type of types_list) {
      if(!types_to_check.includes(type)){
        throw new validationException(400, `Expected account type of ${types_to_check}, but got ${type}.`);
      }
    }
    return true;
  }
  
}
const V = new Validator();
export default V;