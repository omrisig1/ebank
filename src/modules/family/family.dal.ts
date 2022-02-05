import { RowDataPacket } from "mysql2";
import { connection as db} from "../../db/mysql.connection.js";

// Create family account
export async function createFamilyAccount(payload: object): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = "INSERT INTO familys SET ?";
    const [results] = await db.query(sql,payload);
    return results;
}

// Get family account by ID - FULL
export async function getFamilyAccountByIdFull(family_id: number): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = `SELECT *
                FROM family
                WHERE family.id = ${family_id};`;

    const [family] = await db.execute(sql) as RowDataPacket[];
    if(family.length === 0){
        return undefined;
    }
    return family;
}

// Get family account by ID - SHORT
export async function getFamilyAccountByIdShort(family_id: number): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = `SELECT *
                FROM family
                WHERE family.id = ${family_id};`;

    const [family] = await db.execute(sql) as RowDataPacket[];
    if(family.length === 0){
        return undefined;
    }
    return family;
}

// Add individuals to family account
export async function addIndividualsToFamily(family_id: number, payload: object): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = "";
    const [results] = await db.query(sql,[family_id,payload]);
    return results;
}

// Delete individuals from family account
export async function deleteIndividualsFromFamily(family_id: number, payload: object): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = "";
    const [results] = await db.query(sql,[family_id,payload]);
    return results;
}

// Transfer F2B
export async function transferFromFamilyToBusiness(payload: object): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = "";
    const [results] = await db.query(sql,payload);
    return results;
}

// Close family account by ID
export async function closeFamilyAccountById(family_id: number): Promise<any> {
    // TODO: fix the function to create family account in DB

    const sql = "";
    const [results] = await db.query(sql,family_id);
    return results;
}

