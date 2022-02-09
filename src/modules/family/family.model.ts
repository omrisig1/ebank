import IAccount from "../account.model";
import { IIndividualAccount } from "../individual/individual.model";
export interface IFamilyAccount extends IAccount {
    context?: string;
    owners?: string[] | IIndividualAccount[];
}
export interface IFullFamilyAccount extends IAccount {
    context?: string;
    owners?: IIndividualAccount[];
}
