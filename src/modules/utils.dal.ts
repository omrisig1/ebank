import { IIndividualAccount } from './individual/individual.model.js';
import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { RowDataPacket } from 'mysql2/promise';

export async function getAccountsByIndividualsIds(
  individual_ids: number[]
): Promise<IIndividualAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE individual_id IN ?;`;
  const [individuals] = await db.query(sql, individual_ids);
  return individuals as IIndividualAccount[];
}

export async function getAccountsByAccountsIds(account_ids: number[]): Promise<IAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE account_id IN ?;`;
  const [individuals] = await db.query(sql, account_ids);
  return individuals as IIndividualAccount[];
}

export async function getAccountById(account_id: number): Promise<IAccount> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE account_id = ?;`;
  const [individuals] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return individuals[0] as IAccount;
}

export async function changeAccountStatus(account_id: number, status: string): Promise<IAccount> {
  const sql = `UPDATE Accounts
                SET status = ?, e_date = current_timestamp()
                WHERE account_id = ?;`;
  await db.query(sql, [status, account_id]);
  const account = await getAccountById(account_id);
  return account;
}

export async function updateBalance(account_id: number, balance: number): Promise<IAccount> {
  const sql = `UPDATE Accounts
                SET balance = ?, e_date = current_timestamp()
                WHERE account_id = ?;`;
  await db.query(sql, [balance, account_id]);
  const account = await getAccountById(account_id);
  return account;
}