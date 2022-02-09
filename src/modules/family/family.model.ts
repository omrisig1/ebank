import IAccount from '../account.model';
import { IIndividualAccount } from '../individual/individual.model.js';
export interface IFamilyAccount extends IAccount {
    context?: string;
    owners?: string[] | IIndividualAccount[];
}

