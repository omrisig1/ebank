import { IBusinessAccount } from './business.model.js';
import { RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';
import { createAccount } from '../utils.dal.js';

export async function createBusinessAccount(
  payload: IBusinessAccount
): Promise<IBusinessAccount | undefined> {
  await db.beginTransaction();
  try {
    const account_id = await createAccount(payload);
    const sql2 = 'INSERT INTO BusinessAccounts SET ?;';
    await db.query(sql2, {
      account_id,
      company_id: payload.company_id,
      company_name: payload.company_name,
      context: payload.context,
      black_list: payload.black_list,
    });
    const business = await getBusinessAccountByAccountId(account_id);
    await db.commit();
    return business;
  } catch (err) {
    await db.rollback();
    return undefined;
  }
}

export async function getBusinessAccountByCompanyId(company_id: number): Promise<IBusinessAccount> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE company_id = ?;`;
  const [businesses] = (await db.query(sql, company_id)) as RowDataPacket[][];
  return businesses[0] as IBusinessAccount;
}

export async function getBusinessAccountByAccountId(account_id: number): Promise<IBusinessAccount> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE A.account_id = ?;`;
  const [businesses] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return businesses[0] as IBusinessAccount;
}

export async function getBusinessesByCompanyIds(
  company_ids: string[]
): Promise<IBusinessAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE company_id IN (?);`;
  const [businesses] = await db.query(sql, company_ids);
  return businesses as IBusinessAccount[];
}

export async function getBusinessesByAccountsIds(
  account_ids: string[]
): Promise<IBusinessAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE A.account_id IN (?);`;
  const [businesses] = await db.query(sql, [account_ids]);
  return businesses as IBusinessAccount[];
}
