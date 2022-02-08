import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ITransfer } from '../types/types.js';

export async function createAccount(payload: IAccount): Promise<number> {
  const sql1 = 'INSERT INTO Accounts SET ?;';
  const [result_account] = (await db.query(sql1, {
    currency: payload.currency,
    balance: payload.balance,
    status_id: payload.status_id,
  })) as ResultSetHeader[];
  const account_id = result_account.insertId;
  return account_id;
}

export async function getAccountById(account_id: number): Promise<IAccount> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE account_id = ?;`;
  const [accounts] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return accounts[0] as IAccount;
}

export async function getAccountsByIds(account_ids: string[]): Promise<IAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE account_id IN (?);`;
  const [accounts] = await db.query(sql, account_ids);
  return accounts as IAccount[];
}

export async function changeAccountStatus(
  account_ids: string[],
  status: string
): Promise<IAccount[]> {
  const sql = `UPDATE Accounts
                SET status_id = ?, e_date = current_timestamp()
                WHERE account_id IN (?);`;
  await db.query(sql, [status, account_ids]);
  const accounts = await getAccountsByIds(account_ids);
  return accounts;
}

export async function updateBalance(account_id: number, balance: number): Promise<IAccount> {
  const sql = `UPDATE Accounts
                SET balance = ?, e_date = current_timestamp()
                WHERE account_id = ?;`;
  await db.query(sql, [balance, account_id]);
  const account = await getAccountById(account_id);
  return account;
}

export async function saveTransaction(payload: ITransfer): Promise<number> {
  const sql = 'INSERT INTO Transactions SET ?;';
  const [result] = (await db.query(sql, payload)) as ResultSetHeader[];
  const transaction_id = result.insertId;
  return transaction_id;
}

interface secret {
  secret_key : string 
}

export async function getSecretByAccess(str : string) : Promise<secret[]> {
  const sql = `SELECT secret_key  as secret_key
                FROM Clients as C
                WHERE C.access_key = ?;`;
  const [secret] = await db.query(sql, str);
  return secret as secret[];
}

