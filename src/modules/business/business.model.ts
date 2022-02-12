import IAccount from "../account.model";
import IAddress from "../address/address.model";
export interface IBusinessAccount extends IAccount {
    company_id: number;
    company_name: string;
    context?: string;
    black_list?: boolean;
    address?: IAddress;
}
