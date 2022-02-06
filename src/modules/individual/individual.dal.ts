import { IIndividual } from './individual.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';

export async function newIndividualDB(
  payload: IIndividual
): Promise<IIndividual> {
  // payload.status = true; -- check about the status
  const sql = 'INSERT INTO IndividualAccounts SET ?;';
  const [result] = (await db.query(sql, payload)) as ResultSetHeader[];
  const individual = await getIndividualDB(result.insertId.toString());
  return individual;
}

export async function getAllIndividualsDB(): Promise<IIndividual[]> {
  const sql = 'SELECT * FROM IndividualAccounts;';
  const [individuals] = await db.query(sql);
  return individuals as IIndividual[];
}

export async function getIndividualDB(
  individual_id: string
): Promise<IIndividual> {
  const sql = 'SELECT * FROM IndividualAccounts WHERE individual_id = ?;';
  const [individuals] = (await db.query(
    sql,
    individual_id
  )) as RowDataPacket[][];
  return individuals[0] as IIndividual;
}

export async function updateIndividualDB(
  individual_id: string,
  payload: IIndividual
): Promise<IIndividual> {
  const sql = 'UPDATE IndividualAccounts SET ? WHERE individual_id = ?;';
  await db.query(sql, [payload, individual_id]);
  const new_individual = await getIndividualDB(individual_id);
  return new_individual;
}

export async function transferIndividualDB(
  individual_id: string,
  new_balance: number
): Promise<IIndividual> {
  const individual = await getIndividualDB(individual_id);
  individual.balance = new_balance;
  await updateIndividualDB(individual_id, individual); // check about the id in payload
  return individual;
}
