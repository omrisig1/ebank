import { IBusiness } from './business.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';

export async function newBusinessDB(payload: IBusiness): Promise<IBusiness> {
  // payload.status = true; -- check about the status
  const sql = 'INSERT INTO BusinessAccounts SET ?;';
  const [result] = (await db.query(sql, payload)) as ResultSetHeader[];
  const business = await getBusinessDB(result.insertId.toString());
  return business;
}

export async function getAllBusinessesDB(): Promise<IBusiness[]> {
  const sql = 'SELECT * FROM BusinessAccounts;';
  const [business] = await db.query(sql);
  return business as IBusiness[];
}

export async function getBusinessDB(company_id: string): Promise<IBusiness> {
  const sql = 'SELECT * FROM BusinessAccounts WHERE company_id = ?;';
  const [businesses] = (await db.query(sql, company_id)) as RowDataPacket[][];
  return businesses[0] as IBusiness;
}

export async function updateBusinessDB(
  company_id: string,
  payload: IBusiness
): Promise<IBusiness> {
  const sql = 'UPDATE BusinessAccounts SET ? WHERE company_id = ?;';
  await db.query(sql, [payload, company_id]);
  const new_business = await getBusinessDB(company_id);
  return new_business;
}

export async function transferBusinessDB(
  company_id: string,
  new_balance: number
): Promise<IBusiness> {
  const business = await getBusinessDB(company_id);
  business.balance = new_balance;
  await updateBusinessDB(company_id, business); // check about the id in payload
  return business;
}
