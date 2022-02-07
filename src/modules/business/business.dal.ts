import { IBusinessAccount } from './business.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';

export async function createBusinessAccount(payload: IBusinessAccount): Promise<IBusinessAccount> {
  const sql1 = 'INSERT INTO Accounts (`currency`,`balance`,`status_id`,`a_date`,`e_date`) VALUES (?, ?,?,current_timestamp(), current_timestamp());';
  const [result_account] = (await db.query(sql1, [
    payload.currency,
    payload.balance,
    payload.status_id,
  ])) as ResultSetHeader[];
  const sql2 = 'INSERT INTO BusinessAccounts (`account_id`,`company_id`,`company_name`,`context`,`black_list`) VALUES (?,?,?,?,?);';
  await db.query(sql2, [
    result_account.insertId,
    payload.company_id,
    payload.company_name,
    payload.context,
    payload.black_list,
  ]);
  const business = await getBusinessAccountById(payload.company_id);
  return business;
}

export async function getBusinessAccountById(company_id: number): Promise<IBusinessAccount> {
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
  company_ids: number[]
): Promise<IBusinessAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE company_id IN (?);`;
  const [businesses] = await db.query(sql, company_ids);
  return businesses as IBusinessAccount[];
}

export async function getBusinessesByAccountsIds(
  account_ids: number[]
): Promise<IBusinessAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN BusinessAccounts as B
                    ON A.account_id = B.account_id 
                WHERE A.account_id IN (?);`;
  const [businesses] = await db.query(sql, account_ids);
  return businesses as IBusinessAccount[];
}
