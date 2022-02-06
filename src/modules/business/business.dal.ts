import { IBusinessAccount } from './business.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';

export async function newBusinessDB(
  payload: IBusinessAccount
): Promise<IBusinessAccount> {
  // payload.status = true; -- check about the status
  const sql = 'INSERT INTO BusinessAccounts SET ?;';
  const [result] = (await db.query(sql, payload)) as ResultSetHeader[];
  const business = await getBusinessDB(result.insertId.toString());
  return business;
}

export async function getAllBusinessesDB(): Promise<IBusinessAccount[]> {
  const sql = 'SELECT * FROM BusinessAccounts;';
  const [business] = await db.query(sql);
  return business as IBusinessAccount[];
}

export async function getBusinessDB(
  company_id: string
): Promise<IBusinessAccount> {
  const sql = 'SELECT * FROM BusinessAccounts WHERE company_id = ?;';
  const [businesses] = (await db.query(sql, company_id)) as RowDataPacket[][];
  return businesses[0] as IBusinessAccount;
}

export async function updateBusinessDB(
  company_id: string,
  payload: IBusinessAccount
): Promise<IBusinessAccount> {
  const sql = 'UPDATE BusinessAccounts SET ? WHERE company_id = ?;';
  await db.query(sql, [payload, company_id]);
  const new_business = await getBusinessDB(company_id);
  return new_business;
}

export async function transferBusinessDB(
  company_id: string,
  new_balance: number
): Promise<IBusinessAccount> {
  const business = await getBusinessDB(company_id);
  business.balance = new_balance;
  await updateBusinessDB(company_id, business); // check about the id in payload
  return business;
}
