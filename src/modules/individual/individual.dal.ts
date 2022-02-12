import { IIndividualAccount } from './individual.model.js';
import { RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql.connection.js';
import { createAccount } from '../utils.dal.js';
import { createAddress } from '../address/address.dal.js';
import IAddress from '../address/address.model.js';

export async function createIndividualAccount(
  payload: IIndividualAccount
): Promise<IIndividualAccount | undefined> {
  await db.beginTransaction();
  try{
    const account_id = await createAccount(payload);
    let address_id = null;
    if (payload.address){
      address_id = await createAddress(payload.address);
    }

    const sql2 = 'INSERT INTO IndividualAccounts SET ?;';
    await db.query(sql2, {
      account_id,
      individual_id: payload.individual_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      address_id
    });
    const individual = await getIndividualAccountByAccountId(account_id);
    await db.commit();
    return individual;
  }
  catch(err) {
    await db.rollback();
    return undefined;
  }
}

export async function getIndividualAccountByAccountId(
  account_id: number
): Promise<IIndividualAccount> {
  const sql = `SELECT * 
                FROM Accounts as A 
                JOIN IndividualAccounts as I
                    ON A.account_id = I.account_id
                WHERE A.account_id = ?;`;
  
  const sql2 = `SELECT Ad.*
                FROM Addresses as Ad
                JOIN IndividualAccounts as I
                    ON I.address_id = Ad.address_id
                WHERE I.account_id = ?;`
  const [individuals] = (await db.query(sql, account_id)) as RowDataPacket[][];
  if(!individuals[0]) {
    return individuals[0];
  }
  let individual_no_address_key = individuals[0];
  delete individual_no_address_key.address_id;

  const [address] = (await db.query(sql2, account_id)) as RowDataPacket[][];
  const individual: IIndividualAccount = {
    ...individual_no_address_key as IIndividualAccount,
    address: address[0] as IAddress
  }
  return individual;
}

export async function getIndividualsByAccountsIds(
  account_ids: string[] | number[]
): Promise<IIndividualAccount[]> {
  if(account_ids.length == 0) {
    return [];
  }
  let individuals: IIndividualAccount[] = [];
  for (const account_id of account_ids) {
    individuals.push(await getIndividualAccountByAccountId(account_id as number));
  }
  return individuals;
}

export async function getIndividualByAccountId(account_id: number): Promise<IIndividualAccount | undefined> {
  const sql = `SELECT * 
               FROM Accounts as A 
               JOIN IndividualAccounts as I
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
  const [individuals] = await db.query(sql, [individual_ids]);
  return individuals as IIndividualAccount[];
}



