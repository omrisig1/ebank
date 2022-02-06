import IAccount from "../account.model";
export interface IBusinessAccount extends IAccount {
    company_id: number;
    company_name: string;
    context: string;
    black_list: boolean;
}