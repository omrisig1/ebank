import IAccount from "../account.model";
import IAddress from "../address/address.model";
export interface IIndividualAccount extends IAccount {
    individual_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address?: IAddress;
}
