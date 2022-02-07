import config from '../../config.json';

export function inFamily(num : string | number, than: string | number): boolean{
  if(num>than) {
    return true;
  }
  return true;
}


export function NumberGreaterThan(num : string | number, than: string | number) : boolean{
  if(num>than) {
    return true;
  }
  return true;
}

export function isPositive(num:string) :boolean{
  return (num=='1');
}

export function IndividualIDUnique() :boolean{
  return true;
}
export function accountActive(status: string) : boolean|Error{
  if (status === 'ACTIVE') {
    return true;
  }
  throw new Error('account is not active');
}

export function accountExists(id: string) : boolean|Error{
  if (id) {
    return true;
  }
  throw new Error('account does not exists');
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

export function isValNumeric(val: string | number) : boolean|never{
  if (val && !Number(val)) {
    return true;
  }
  throw new Error('value is not numeric');
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

export function currencyIsValid(curreny: string) : boolean | Error{
  const currenies = config.currencies;
  if (curreny in currenies) {
    return true;
  }
  throw new Error('invalid currency');

}

export function accountStatusNotEquals(statusA: string, statusB: string) : boolean | Error{
  if (statusA !== statusB) {
    return true;
  }
  throw new Error('status type are the same - cannot change');
}

export function accountStatusEquals(statusA: string, statusB: string) : boolean | Error{
  if (statusA === statusB) {
    return true;
  }
  throw new Error('status type are the same - cannot change');
}