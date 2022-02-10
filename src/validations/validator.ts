/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import config from '../../config.json';
import { account_status } from '../types/types.js';

export function inFamily(accounts : string[] , id: string | number): boolean{
  if(accounts.includes(id.toString())) {
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

export function NumberEquals(num : string | number, than: string | number) : boolean{
  if(Number(num) === Number(than)) {
    return true;
  }
  throw new Error(`${num} should be equal to ${than}`);
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

export function IndividualIDUnique(str:string) :string{
  return str;
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
  if (val && Number(val)) {
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

export function transferSizeSmallerThan(accountType: string, amount: string) : boolean|Error{
  const types = JSON.parse(JSON.stringify(config.account_minimum_transfer));
  if (isValNumeric(amount) && Number(types[accountType]) <= Number(amount)) {
    return true;
  }
  throw new Error('trasnfer amount exceeds account type permition error');
}

export function checkAccountTypeEquals(stringA: string, stringB: string) : boolean|Error{
  if (stringA === stringB) {
    return true;
  }
  throw new Error('account of different type');
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
  const currencies = ['USD','EUR'];
  if (currencies.includes(currency)) {
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