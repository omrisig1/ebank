import { RowDataPacket } from 'mysql2';
import { connection as db } from '../../db/mysql.connection.js';
import { getIndividualsByAccountsIds } from '../individual/individual.dal.js';
import { changeAccountStatus, createAccount } from '../utils.dal.js';
import { IFamilyAccount } from './family.model.js';

// Create family account
export async function createFamilyAccount(payload: IFamilyAccount): Promise<IFamilyAccount> {
  const account_id = await createAccount(payload);
  const sql2 = 'INSERT INTO FamilyAccounts SET ?;';
  await db.query(sql2, {
    account_id,
    context: payload.context,
  });
  const family_account = await getFamilyAccountByAccountId(account_id, 'short');
  return family_account;
}

// Add individuals to family account - return FULL/SHORT
export async function addFamilyOwners(
  family_owners: [family_account_id: number, individual_account_id: number][],
  details_level: string = 'short'
): Promise<IFamilyAccount> {
  const sql = 'INSERT INTO OwnersFamily (family_account_id, individual_account_id) VALUES ?';
  await db.query(sql, family_owners);
  const account_id = family_owners[0][0];
  const family_account = await getFamilyAccountByAccountId(account_id, details_level);
  return family_account;
}

// Get family account by ID - FULL/SHORT§
export async function getFamilyAccountByAccountId(
  account_id: number,
  details_level: string = 'short'
): Promise<IFamilyAccount> {
  const sql = `SELECT *
        FROM Accounts as A JOIN FamilyAccounts as F
            ON A.account_id = F.account_id
        WHERE account_id = ?;`;
  const [result] = (await db.execute(sql, account_id)) as RowDataPacket[];
  const family = result[0] as IFamilyAccount;
  family.owners = await getOwnersListByFamilyAccountId(family.account_id as number);
  if (details_level === 'full') {
    family.owners = await getIndividualsByAccountsIds(family.owners);
  }
  return family;
}

export async function getOwnersListByFamilyAccountId(account_id: number): Promise<number[]> {
  const sql = `SELECT individual_account_id
                FROM OwnersFamily
                WHERE family_account_id = ?;`;
  const [owners] = (await db.query(sql, account_id)) as RowDataPacket[][];
  return owners as unknown as number[];
}

// Delete individuals from family account - return FULL/SHORT
export async function deleteIndividualsFromFamily(
  account_id: number,
  owners: number[],
  details_level: string = 'short'
): Promise<IFamilyAccount> {
  const sql = `DELETE FROM OwnersFamily 
                WHERE family_account_id = ?
                    AND individual_account_id IN (?)`;
  await db.query(sql, [account_id, owners]);
  const family_account = await getFamilyAccountByAccountId(account_id, details_level);
  return family_account;
}

// Close family account by ID
// ------------------ call delete from service !!! ------------------
export async function closeFamilyAccountById(account_id: number): Promise<IFamilyAccount> {
  const family = await getFamilyAccountByAccountId(account_id);
  await deleteIndividualsFromFamily(account_id, family.owners as number[]);
  await changeAccountStatus([account_id], '2');
  return await getFamilyAccountByAccountId(account_id);
}

export async function getFamilyAccountsByAccountIDS(
  account_ids: number[]
): Promise<IFamilyAccount[]> {
  const sql = `SELECT *
        FROM Accounts as A JOIN FamilyAccounts as F
            ON A.account_id = F.account_id
        WHERE account_id IN (?);`;
  const [result] = (await db.execute(sql, account_ids)) as RowDataPacket[];
  const family = result as IFamilyAccount[];
  return family;
}
