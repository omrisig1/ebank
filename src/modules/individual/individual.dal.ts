import { IIndividualAccount } from './individual.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';

export async function createIndividualAccount(
  payload: IIndividualAccount
): Promise<IIndividualAccount> {
  const sql1 = 'INSERT INTO Accounts (`currency`,`balance`,`status_id`,`a_date`,`e_date`) VALUES (?, ?,?,current_timestamp(), current_timestamp());';
  const [result_account] = (await db.query(sql1, [
    payload.currency,
    payload.balance,
    payload.status_id,
  ])) as ResultSetHeader[];
  const sql2 = 'INSERT INTO IndividualAccounts VALUES (?,?,?,?,?,?);';
  await db.query(sql2, [
    result_account.insertId,
    payload.individual_id,
    payload.first_name,
    payload.last_name,
    payload.email,
    payload.address_id
  ]);
  const individual = await getIndividualAccountByAccountId(result_account.insertId);
  return individual;
}

export async function getIndividualAccountByAccountId(account_id: number): Promise<IIndividualAccount> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE A.account_id = ?;`;
  const [individuals] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return individuals[0] as IIndividualAccount;
}

export async function getIndividualsByIndividualsIds(
  individual_ids: number[]
): Promise<IIndividualAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE individual_id IN ?;`;
  const [individuals] = await db.query(sql, individual_ids);
  return individuals as IIndividualAccount[];
}

export async function getIndividualsByAccountsIds(
  account_ids: number[]
): Promise<IIndividualAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE account_id IN ?;`;
  const [individuals] = await db.query(sql, account_ids);
  return individuals as IIndividualAccount[];
}
