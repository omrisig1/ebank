import { IBusinessAccount } from './business.model.js';
import { RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';
import  Util from '../utils.dal.js';
import address_dal from '../address/address.dal.js';
import IAddress from '../address/address.model.js';

class BuisnessDal {
   async  createBusinessAccount(payload: IBusinessAccount): Promise<IBusinessAccount | undefined> {
    await db.beginTransaction();
    try{
      const account_id = await Util.createAccount(payload);
      let address_id = null;
      if (payload.address){
        address_id = await address_dal.createAddress(payload.address);
      }
      const sql2 = 'INSERT INTO BusinessAccounts SET ?;';
      await db.query(sql2, {
        account_id,
        company_id: payload.company_id,
        company_name: payload.company_name,
        context: payload.context,
        black_list: payload.black_list,
        address_id
      });
      const business = await this.getBusinessAccountByAccountId(account_id);
      await db.commit();
      return business;
    }
    catch(err) {
      await db.rollback();
      return undefined;
    }
  }
  
   async  getBusinessAccountByAccountId(account_id: number): Promise<IBusinessAccount> {
    const sql = `SELECT * 
                  FROM Accounts as A 
                  JOIN BusinessAccounts as B
                      ON A.account_id = B.account_id 
                  WHERE A.account_id = ?;`;
                  
    const sql2 = `SELECT Ad.*
                  FROM Addresses as Ad
                  JOIN BusinessAccounts as B
                      ON B.address_id = Ad.address_id
                  WHERE B.account_id = ?;`
    const [businesses] = (await db.query(sql, account_id)) as RowDataPacket[][];
    if(!businesses[0]) {
      return businesses[0];
    }
    let business_no_address_key = businesses[0];
    delete business_no_address_key.address_id;
  
    const [address] = (await db.query(sql2, account_id)) as RowDataPacket[][];
    const business: IBusinessAccount = {
      ...business_no_address_key as IBusinessAccount,
      address: address[0] as IAddress
    }
    return business;
  }
  
   async  getBusinessesByAccountsIds(
    account_ids: string[]
  ): Promise<IBusinessAccount[]> {
    let businesses: IBusinessAccount[] = [];
    account_ids = Array.isArray(account_ids)? account_ids : [account_ids];
    for (const account_id of account_ids) {
      businesses.push(await this.getBusinessAccountByAccountId(Number(account_id)));
    }
    return businesses;
  }
  
   async  getBusinessByAccountId(account_id: number): Promise<IBusinessAccount | undefined> {
    const sql = `SELECT * 
                 FROM Accounts as A 
                 JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id
                 WHERE A.account_id = ?;`;
    const [businesss] = (await db.query(sql, account_id)) as RowDataPacket[][];
    return businesss[0] as IBusinessAccount;
  }
}

const buisness_dal = new BuisnessDal();
export default buisness_dal;