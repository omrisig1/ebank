import { RowDataPacket } from 'mysql2';
import { connection as db } from '../../db/mysql.connection.js';
//import { IFamilyAccount } from "./family.model.js";

// Create family account
// export async function createFamilyAccount(payload: IFamilyAccount): Promise<IFamilyAccount> {
//   // TODO: fix the function to create family account in DB

//   const sql = `SELECT *
//     FROM FamilyAccounts;`;
//   const [results] = await db.query(sql, payload);
//   return results;
// }

// Get family account by ID - FULL/SHORT
export async function getFamilyAccountById(
  family_id: number,
  details_level: string = 'full'
): Promise<any> {
  // TODO: fix the function to get family account from DB by the details_level
  let sql;
  if (details_level === 'full') {
    sql = `SELECT *
        FROM FamilyAccounts
               WHERE FamilyAccounts.account_id = ${family_id};`;
  }
  sql = `SELECT *
    FROM FamilyAccounts
           WHERE FamilyAccounts.account_id = ${family_id};`;

  const [family] = (await db.execute(sql)) as RowDataPacket[];
  if (family.length === 0) {
    return undefined;
  }
  return family;
}

// Add individuals to family account - return FULL/SHORT
export async function addIndividualsToFamily(
  family_id: number,
  details_level: string = 'full',
  payload: object
): Promise<any> {
  // TODO: fix the function to add individuals to family account,
  //       and return family model by the details_level
  let sql;
  if (details_level === 'full') {
    sql = `SELECT *
        FROM FamilyAccounts
               WHERE FamilyAccounts.account_id = ${family_id};`;
  }
  sql = `SELECT *
    FROM FamilyAccounts
           WHERE FamilyAccounts.account_id = ${family_id};`;

  const [results] = await db.query(sql, [family_id, payload]);
  return results;
}

// Delete individuals from family account - return FULL/SHORT
export async function deleteIndividualsFromFamily(
  family_id: number,
  details_level: string = 'full',
  payload: object
): Promise<any> {
  // TODO: fix the function to Delete individuals from family account,
  //       and return family model by the details_level
  let sql;
  if (details_level === 'full') {
    sql = `SELECT *
        FROM FamilyAccounts
               WHERE FamilyAccounts.account_id = ${family_id};`;
  }
  sql = `SELECT *
    FROM FamilyAccounts
           WHERE FamilyAccounts.account_id = ${family_id};`;

  const [results] = await db.query(sql, [family_id, payload]);
  return results;
}

// Transfer F2B
export async function transferFromFamilyToBusiness(payload: object): Promise<any> {
  // TODO: fix the function to trnsfer money from family to business

  const sql = `SELECT *
    FROM FamilyAccounts;`;
  const [results] = await db.query(sql, payload);
  return results;
}

// Close family account by ID
export async function closeFamilyAccountById(family_id: number): Promise<any> {
  // TODO: fix the function to close family account by ID

  const sql = `SELECT *
    FROM FamilyAccounts
           WHERE FamilyAccounts.account_id = ${family_id};`;
  const [results] = await db.query(sql);
  return results;
}
