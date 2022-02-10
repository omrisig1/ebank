export interface IResponseMessage {
    status: number;
    message: string;
    data?:any
}
export interface IErrorResponse {
  status: number;
  message: string;
  stack?: string;
}

export interface ITransfer {
    source_account: string;
    destination_account: string;
    amount: string;
}

export interface IChangeStatus {
  list_of_accounts: string[];
  action: string;
}

export interface ICreateFamilyAccount {
  owners: [string, string][];
  currency: string;
  context?: string;
}
export interface IAddIndividualsToFamily {
  individuals_to_add: [string, string][];
}
export interface IRemoveIndividualsToFamily {
  individuals_to_remove: [string, string][];
}
export interface IRemoveIndividualsToFamily{
    individuals_to_remove: [string,string][];
}

export interface simple_transfer {
    account_id:number,
    new_balance:number
}

export enum account_status {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum details_level {
  FULL = 'full',
  SHORT = 'short',
}

export enum account_type {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
  FAMILY = 'family',
}