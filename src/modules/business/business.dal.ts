import { RowDataPacket } from "mysql2";
import { connection as db} from "../../db/mysql.connection.js";
import { IBusinessAccount } from "./business.model.js";

// Create an business account
export async function createBusinessAccount(payload: IBusinessAccount): Promise<any> {
    // TODO: fix the function to create business account in DB

    const sql = "INSERT INTO businesss SET ?";
    const [results] = await db.query(sql,payload);
    return results;
}

// Get business account by ID
export async function getBusinessAccountById(idToRead: number): Promise<any> {
    // TODO: fix the function to create business account in DB

    const sql = `SELECT *
                FROM businesss 
                WHERE businesss.id = ${idToRead};`;

    const [business] = await db.execute(sql) as RowDataPacket[];
    if(business.length === 0){
        return undefined;
    }
    return business;
}

// Transfer B2B/B2I (same currency)
export async function transferSameCurrency(payload: object): Promise<any> {
    // TODO: fix the function to create business account in DB

    const sql = "";
    const [results] = await db.query(sql,payload);
    return results;
}

// Transfer B2B/B2I (different currency)
export async function transferDifferentCurrency(payload: object): Promise<any> {
    // TODO: fix the function to create business account in DB

    const sql = "";
    const [results] = await db.query(sql,payload);
    return results;
}
