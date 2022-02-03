import config from '../../config.json';

export function stringNotEmpty(str: any) {
  if (str && typeof str === 'string' && str !== '') {
    return true;
  }
  throw new Error('value is not a string');
}

export function mandatoryFieldExists(object: any, fieldName: string) {
  if (typeof object === 'object' && object.fieldName && stringNotEmpty(object[fieldName])) {
    return true;
  }
  throw new Error('mandatory field missing');
}

export function isValNumeric(val: any) {
  if (val && !Number(val)) {
    return true;
  }
  throw new Error('value is not numeric');
}

export function stringLengthAtLeast(val: any, length: number) {
  if (stringNotEmpty(val) && val.length >= length) {
    return true;
  }
  throw new Error('string length error');
}

export function stringLengthEquals(val: any, length: number) {
  if (stringNotEmpty(val) && val.length === length) {
    return true;
  }
  throw new Error('string length error');
}

export function transferSizeSmallerThan(accountType: string, amount: number) {
  const types = JSON.parse(JSON.stringify(config.account_minimum_transfer));
  if (isValNumeric(amount) && Number(types[accountType]) <= Number(amount)) {
    return true;
  }
  throw new Error('trasnfer amount exceeds account type permition error');
}
