import IAccount from "../account.model";
export interface IIndividualAccount extends IAccount {
    individual_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address_id?: number;
    black_list?: boolean;

}
