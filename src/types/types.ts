export interface IResponseMessage {
    status: number;
    message: string;
    data: any;
}
export interface IErrorResponse {
    status: number;
    message: string;
    stack?: string;
}

export interface ITranser {
    source: string;
    destination: string;
    amount: string;
}

export interface IChangeStatus {
    list_of_accounts: number[];
    action : string;
}

export interface ICreateFamilyAccount {
    owners: [string,string][];
    currency: string;
    context?: string;
}
export interface IAddIndividualsToFamily{
    individuals_to_add: [string,string][];
}
export interface IRemoveIndividualsToFamily{
    individuals_to_remove: [string,string][];
}