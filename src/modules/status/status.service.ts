/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import util from "../utils.dal.js";
import Validator from "../../validations/validator.js";
import { account_status, IChangeStatus } from "../../types/types.js";
import IAccount from "../account.model.js";

class StatusService {
    // Activate/Deactivate accounts
    async  changeAccountStatus(payload: IChangeStatus): Promise<IAccount[]> {
      const account_ids = payload.list_of_accounts.map((acc_tuple:any)=> acc_tuple[0]);
      const accounts = await util.getAccountsByIds(account_ids);
      Validator.NumberEquals([accounts.length,"number of accounts"], [payload.list_of_accounts.length,"provided list of accounts"]);
      const accounts_statuses = await util.changeAccountStatus(
        account_ids,
        account_status[payload.action.toUpperCase() as keyof typeof account_status].toString()
      );
      return accounts_statuses;
  }
}
const S = new StatusService();
export default S;
