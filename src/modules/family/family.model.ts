import IAccount from "../account.model";
export interface IFamilyAccount extends IAccount {
    context: string;
}