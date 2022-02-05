import { RowDataPacket } from "mysql2";
import { connection as db} from "../../db/mysql.connection.js";
import { IIndividualAccount } from "./individual.model.js";

// Create an individual account
export async function createIndividualAccount(payload: IIndividualAccount): Promise<any> {
    // TODO: fix the function to create individual account in DB

    const sql = "INSERT INTO individuals SET ?";
    const [results] = await db.query(sql,payload);
    return results;
}

// Get individual account by ID
export async function getIndividualAccountById(idToRead: number): Promise<any> {
    // TODO: fix the function to create individual account in DB

    const sql = `SELECT *
                FROM individuals 
                WHERE individuals.id = ${idToRead};`;

    const [individual] = await db.execute(sql) as RowDataPacket[];
    if(individual.length === 0){
        return undefined;
    }
    return individual;
}