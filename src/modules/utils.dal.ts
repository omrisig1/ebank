import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { simple_transfer } from '../types/types.js';

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

export async function multiTransfer(transfers: simple_transfer[]): Promise<IAccount[]> {
  let accounts: IAccount[] = [];
  await db.beginTransaction();
  try {
    for (const transfer of transfers) {
      accounts.push(await updateBalance(transfer.account_id, transfer.new_balance));
    }
    await db.commit();
    return accounts;
  } catch (err) {
    await db.rollback();
    throw err;
  }
}

export function createFamilyIndividualArray(
  individuals_new_balance: [string, string][],
  account_id: number
): [family_account_id: string, individual_account_id: string][] {
  let family_account_owners: [string, string][] = [];
  for (const owner of individuals_new_balance) {
    family_account_owners.push([String(account_id), owner[0]]);
  }
  return family_account_owners;
}

export function getAccountsIdsArray(
  account_balance: [account_id: string, balance: string][]
): string[] {
  const accounts: string[] = [];
  for (const account of account_balance) {
    accounts.push(account[0]);
  }
  return accounts;
}
