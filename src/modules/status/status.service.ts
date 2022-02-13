/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import * as util from "../utils.dal.js";
import * as Validator from "../../validations/validator.js";
import { account_status, IChangeStatus } from "../../types/types.js";
import IAccount from "../account.model.js";

// Activate/Deactivate accounts
export async function changeAccountStatus(payload: IChangeStatus): Promise<IAccount[]> {
    // TODO: call dal to create new individual account
    //       add validations and business logic
    const accounts = await util.getAccountsByIds(payload.list_of_accounts);
    Validator.NumberEquals([accounts.length,"number of accounts"], [payload.list_of_accounts.length,"provided list of accounts"]);
    const accounts_statuses = await util.changeAccountStatus(
      payload.list_of_accounts,
      account_status[payload.action.toUpperCase() as keyof typeof account_status].toString()
    );
    return accounts_statuses;
}