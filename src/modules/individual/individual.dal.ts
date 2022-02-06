import { RowDataPacket } from "mysql2";
import { connection as db} from "../../db/mysql.connection.js";
import { IIndividualAccount } from "./individual.model.js";
// import Promise from "bluebird";

// Create an individual account
export async function createIndividualAccount(payload: IIndividualAccount): Promise<any> {
    // TODO: fix the function to create individual account in DB

    const sql = "INSERT INTO individuals SET ?";
    const [results] = await db.query(sql,payload);
    return results;
}

// Get individual account by ID
export async function getIndividualAccountById(idToRead: number): Promise<any> {
    // TODO: fix the function to get individual account in DB

    const sql = `SELECT *
                FROM individuals 
                WHERE individuals.id = ${idToRead};`;

    const [individual] = await db.execute(sql) as RowDataPacket[];
    if(individual.length === 0){
        return undefined;
    }
    return individual;
}

// Activate/Deactivate account by ID
export async function changeAccountStatus(payload: object): Promise<any> {
    // TODO: fix the function to change statuse of the given accounts in DB
    //       and to return the list with the updated status.
    // payload: {id_list:string[],action: string}
    
    // Promise.each(payload.id_list,(account_id) => {
    //     let sql = `UPDATE playlists SET ? WHERE id= ${account_id};`;
    //     const [individual] = await db.execute(sql) as RowDataPacket[];
    //     if(individual.length === 0){
    //         return undefined;
    //     }
    //     return payload.id_list;
    // })        
    const sql = ``;

    const [individual] = await db.execute(sql) as RowDataPacket[];
    if(individual.length === 0){
        return undefined;
    }
    return payload;
}