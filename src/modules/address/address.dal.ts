import { connection as db } from '../../db/mysql.connection.js';
import { ResultSetHeader } from 'mysql2/promise';
import IAddress from './address.model.js';

class AddressDal {
     async  createAddress(payload: IAddress): Promise<number> {
        const sql = 'INSERT INTO Addresses SET ?;';
        const [result_address] = (await db.query(sql, payload)) as ResultSetHeader[];
        const address_id = result_address.insertId;
        return address_id;
    }
}

const address_dal = new AddressDal();
export default address_dal;