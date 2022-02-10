import { RowDataPacket } from 'mysql2';
import { connection as db } from '../../db/mysql.connection.js';
import { getIndividualsByAccountsIds } from '../individual/individual.dal.js';
import {
  changeAccountStatus,
  createAccount,
  createFamilyIndividualArray,
  getAccountsIdsArray,
} from '../utils.dal.js';
import { IFamilyAccount } from './family.model.js';

// Create family account
export async function createFamilyAccount(
  payload: IFamilyAccount,
  family_new_balance: number,
  individuals_new_balance: [string, string][]
): Promise<IFamilyAccount | undefined> {
  await db.beginTransaction();
  try {
    const account_id = await createAccount(payload);

    const sql2 = 'INSERT INTO FamilyAccounts SET ?;';
    await db.query(sql2, {
      account_id: Number(account_id),
      context: payload.context,
    });

    // owners to add to the family account
    const family_account = await addFamilyOwners(
      account_id,
      family_new_balance,
      individuals_new_balance,
      'full'
    );

    await db.commit();
    return family_account;
  } catch (err) {
    await db.rollback();
    return undefined;
  }
}

// Add individuals to family account - return FULL/SHORT
export async function addFamilyOwners(
  account_id: number,
  family_new_balance: number,
  individuals_new_balance: [string, string][],
  details_level: string = 'short'
): Promise<IFamilyAccount | undefined> {
  await db.beginTransaction();
  try {
    const family_owners = createFamilyIndividualArray(individuals_new_balance, account_id);
    await updateFamilyAndIndividualsBalance(
      account_id,
      family_new_balance,
      individuals_new_balance
    );
    const sql = 'INSERT INTO OwnersFamily (family_account_id, individual_account_id) VALUES (?)';
    for (const item of family_owners) {
        await db.query(sql, [item]);
    }


    const family_account = await getFamilyAccountByAccountId(account_id, details_level);

   await db.commit();
    return family_account;
  } catch (err) {
    await db.rollback();
    return undefined;
  }
}

// Get family account by ID - FULL/SHORT§
export async function getFamilyAccountByAccountId(
  account_id: number,
  details_level: string = 'short'
): Promise<IFamilyAccount> {
  const sql = `SELECT *
        FROM Accounts as A JOIN FamilyAccounts as F
            ON A.account_id = F.account_id
        WHERE A.account_id = ?;`;
  const [result] = (await db.execute(sql, [account_id])) as RowDataPacket[];
  const family = result[0] as IFamilyAccount;

  family.owners = await getOwnersListByFamilyAccountId(family.account_id as number);
  if (details_level === 'full') {
    family.owners = await getIndividualsByAccountsIds(family.owners);

  }

  return family;
}

export async function getOwnersListByFamilyAccountId(account_id: number): Promise<string[]> {
  const sql = `SELECT individual_account_id
                FROM OwnersFamily
                WHERE family_account_id = ?;`;
  const [owners] = (await db.query(sql, [account_id])) as RowDataPacket[][];
  return owners.map((item)=>item['individual_account_id'].toString());
}

// Delete individuals from family account - return FULL/SHORT
export async function deleteIndividualsFromFamily(
  account_id: number,
  family_new_balance: number,
  individuals_new_balance: [string, string][],
  owners: string[],
  details_level: string = 'short'
): Promise<IFamilyAccount | undefined> {
  await db.beginTransaction();
  try {

    await updateFamilyAndIndividualsBalance(
      account_id,
      family_new_balance,
      individuals_new_balance
    );
    const sql = `DELETE FROM OwnersFamily 
                WHERE family_account_id = ?
                    AND individual_account_id IN (?)`;
    await db.query(sql, [account_id, owners]);
    const family_account = await getFamilyAccountByAccountId(account_id, details_level);

    await db.commit();
    return family_account;
  } catch (err) {
    await db.rollback();
    return undefined;
  }
}

// Close family account by ID
export async function closeFamilyAccountById(account_id: number): Promise<IFamilyAccount> {
  // const family = await getFamilyAccountByAccountId(account_id);
  // await deleteIndividualsFromFamily(account_id, family.owners as string[]);
  await changeAccountStatus([account_id.toString()], '2');
  return await getFamilyAccountByAccountId(account_id);
}

export async function getFamilyAccountsByAccountIDS(
  account_ids: number[]
): Promise<IFamilyAccount[]> {
  console.log('family account_ids for function:',account_ids);

  const sql = `SELECT *
        FROM Accounts as A JOIN FamilyAccounts as F
            ON A.account_id = F.account_id
        WHERE A.account_id IN (?);`;
  const [result] = (await db.query(sql, account_ids)) as RowDataPacket[];
  const family = result as IFamilyAccount[];
  console.log('family array:',family);
  return family;
}

export async function updateFamilyAndIndividualsBalance(
  family_account_id: number,
  new_family_balance: number,
  individuals_new_balance: [string, string][]
): Promise<void> {
  const accounts_balances: [string, string][] = [
    ...individuals_new_balance,
    [String(family_account_id), String(new_family_balance)],
  ];
  const accounts = getAccountsIdsArray(accounts_balances);
  let sql = `UPDATE Accounts SET balance = (case account_id`;
  for (const account_balance of accounts_balances) {
    sql += ` when ${account_balance[0]} then ${account_balance[1]} `;
  }
  sql += `end) WHERE account_id IN (?)`;

  await db.query(sql, [accounts]);
}
