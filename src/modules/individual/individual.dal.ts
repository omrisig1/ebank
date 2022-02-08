import { IIndividualAccount } from './individual.model.js';
import { RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';
import { createAccount } from '../utils.dal.js';

export async function createIndividualAccount(
  payload: IIndividualAccount
): Promise<IIndividualAccount> {
  const account_id = await createAccount(payload);
  const sql2 = 'INSERT INTO IndividualAccounts SET ?;';
  await db.query(sql2, {
    account_id,
    individual_id: payload.individual_id,
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    address_id: payload.address_id,
  });
  const individual = await getIndividualAccountByAccountId(account_id);
  return individual;
}

export async function getIndividualAccountByAccountId(
  account_id: number
): Promise<IIndividualAccount> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE A.account_id = ?;`;
  const [individuals] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return individuals[0] as IIndividualAccount;
}

export async function getIndividualsByIndividualsIds(
  individual_ids: string[]
): Promise<IIndividualAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE individual_id IN (?);`;
  const [individuals] = await db.query(sql, individual_ids);
  return individuals as IIndividualAccount[];
}

export async function getIndividualsByAccountsIds(
  account_ids: string[]
): Promise<IIndividualAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id 
                WHERE account_id IN (?);`;
  const [individuals] = await db.query(sql, account_ids);
  return individuals as IIndividualAccount[];
}
