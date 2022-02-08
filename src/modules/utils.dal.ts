import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { RowDataPacket } from 'mysql2/promise';
import { Request } from "express";

export async function getAccountById(account_id: number): Promise<IAccount> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE account_id = ?;`;
  const [accounts] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return accounts[0] as IAccount;
}

export async function getAccountsByIds(account_ids: number[]): Promise<IAccount[]> {
  const sql = `SELECT * 
                FROM Accounts as A 
                WHERE account_id IN (?);`;
  const [accounts] = await db.query(sql, account_ids);
  return accounts as IAccount[];
}

export async function changeAccountStatus(account_ids: number[], status: string): Promise<IAccount[]>{
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

export async function getReponseByIdempotencyKey(user: string, key : string[] |string | undefined = '') : Promise<RowDataPacket> {
  const sql = `SELECT response
        FROM Idempotency I 
        WHERE user = ? AND idempotency_key = ?;`;
  const [response] = (await db.query(sql, [user,key]))as RowDataPacket[][];
  return response[0];
}

export async function sameRequest(user: string, req:Request ,key : string[] |string | undefined = '') : Promise<RowDataPacket> {
  const sql = `SELECT response
        FROM Idempotency I 
        WHERE user = ? AND idempotency_key = ? AND req_method = ? AND req_path = ? AND req_params = ? req_body = ? req_query = ?;`;
  const [response] = (await db.query(sql, [user, key, req.method, req.url, req.params, req.body, req.query]))as RowDataPacket[][];
  return response[0];
}

export async function addIdempotencyResponse(user: string, key:string, res : string) : Promise<RowDataPacket> {
  const sql = `INSERT INTO Idempotency ('user','idempotency_key','reponse')
        VALUES (?,?,?)`;
  const [response] = (await db.query(sql, [user,key,res]))as RowDataPacket[][];
  return response[0];
}
