/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ITransfer, simple_transfer } from '../types/types.js';
import config from "../../config.json";

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
                WHERE A.account_id = ?;`;
  const [accounts] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return accounts[0] as IAccount;
}

export async function getAccountsByIds(account_ids: string[]): Promise<IAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE A.account_id IN (?);`;
  const [accounts] = await db.query(sql, [account_ids]);
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

export async function getRandomAccountID(type? : string) : Promise<string | undefined>{
  let query = "SELECT A.account_id FROM accounts A";
  switch(type) {
    case config.account_types.INDIVIDUAL:
      query += " INNER JOIN IndividualAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
      break;
    case config.account_types.BUISNESS:
      query += " INNER JOIN BusinessAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
      break;
    case config.account_types.FAMILY:
      query += " INNER JOIN FamilyAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
      break;
    default:
      query += " ORDER BY RAND() LIMIT 1";
      break;
  }
  const [account_id] = await db.query(query);
  if(Array.isArray(account_id) && account_id.length > 0) {
    return (account_id as any)[0].account_id;
  }
  else{
    return undefined;
  }
}

export async function transfer(
  payload: ITransfer,
  source_acc: IAccount,
  destination_acc: IAccount
):Promise<IAccount[]> {
  const simple_transfer1: simple_transfer = {
    account_id: Number(payload.source_account),
    new_balance: Number(source_acc.balance) - Number(payload.amount),
  };
  const simple_transfer2: simple_transfer = {
    account_id: Number(payload.destination_account),
    new_balance: Number(destination_acc.balance) + Number(payload.amount),
  };
  const results = await multiTransfer([simple_transfer1, simple_transfer2]);
  return results;
}