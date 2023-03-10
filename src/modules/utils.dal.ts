/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { connection as db } from '../db/mysql.connection.js';
import IAccount from './account.model.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ITransfer, simple_transfer, Idempotency, secret, IResponseMessage} from '../types/types.js';
import config from ".././config.js";
import { Request } from "express";
import crypto from 'crypto';

class UtilDal {
     async  createAccount(payload: IAccount): Promise<number> {
      const sql1 = 'INSERT INTO Accounts SET ?;';
      const [result_account] = (await db.query(sql1, {
        currency: payload.currency,
        balance: payload.balance,
        status_id: payload.status_id,
      })) as ResultSetHeader[];
      const account_id = result_account.insertId;
      return account_id;
    }
    
     async  getAccountById(account_id: number): Promise<IAccount> {
      const sql = `SELECT * 
                    FROM Accounts as A 
                    WHERE A.account_id = ?;`;
      const [accounts] = (await db.query(sql, account_id)) as RowDataPacket[][];
      return accounts[0] as IAccount;
    }
    
     async  getAccountsByIds(account_ids: string[] | number[]): Promise<IAccount[]> {
      const sql = `SELECT * 
                    FROM Accounts as A 
                    WHERE A.account_id IN (?);`;
      const [accounts] = await db.query(sql, [account_ids]);
      return accounts as IAccount[];
    }
    
     async  changeAccountStatus(
      account_ids: string[],
      status: string
    ): Promise<IAccount[]> {
      const sql = `UPDATE Accounts
                    SET status_id = ?, e_date = current_timestamp()
                    WHERE account_id IN (?);`;
      await db.query(sql, [status, account_ids]);
      const accounts = await this.getAccountsByIds(account_ids);
      return accounts;
    }
    
     async  updateBalance(account_id: number, balance: number): Promise<IAccount> {
      const sql = `UPDATE Accounts
                    SET balance = ?, e_date = current_timestamp()
                    WHERE account_id = ?;`;
      await db.query(sql, [balance, account_id]);
      const account = await this.getAccountById(account_id);
      return account;
    }
    
     async  multiTransfer(transfers: simple_transfer[]): Promise<IAccount[]> {
      let accounts: IAccount[] = [];
      await db.beginTransaction();
      try {
        for (const transfer of transfers) {
          accounts.push(await this.updateBalance(transfer.account_id, transfer.new_balance));
        }
        await db.commit();
    
        return accounts;
      } catch (err) {
        await db.rollback();
        throw err;
      }
    }
    
    
     async  getSecretByAccess(str : string) : Promise<secret[]> {
      const sql = `SELECT secret_key  as secret_key
                    FROM Clients as C
                    WHERE C.access_key = ?;`;
      const [secret] = await db.query(sql, str);
      return secret as secret[];
    }
    
      createFamilyIndividualArray(
      individuals_new_balance: [string, string][],
      account_id: number
    ): [family_account_id: string, individual_account_id: string][] {
      let family_account_owners: [string, string][] = [];
      for (const owner of individuals_new_balance) {
        family_account_owners.push([String(account_id), owner[0]]);
      }
      return family_account_owners;
    }
    
      getAccountsIdsArray(
      account_balance: [account_id: string, balance: string][]
    ): string[] {
      const accounts: string[] = [];
      for (const account of account_balance) {
        accounts.push(account[0]);
      }
      return accounts;
    }
    
     async  getRandomAccountID(type? : string) : Promise<string | undefined>{
      let query = "SELECT A.account_id FROM accounts A";
      switch(type) {
        case config.account_types.INDIVIDUAL:
          query += " INNER JOIN IndividualAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
          break;
        case config.account_types.BUISNESS:
          query += " INNER JOIN BusinessAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
          break;
        case config.account_types.FAMILY:
          query += " INNER JOIN FamilyAccounts ia ON A.account_id = ia.account_id ORDER BY RAND() LIMIT 1";
          break;
        default:
          query += " ORDER BY RAND() LIMIT 1";
          break;
      }
      const [account_id] = await db.query(query);
      if(Array.isArray(account_id) && account_id.length > 0) {
        return (account_id as any)[0].account_id;
      }
      else{
        return undefined;
      }
    }
    
     async  transfer(
      payload: ITransfer,
      source_acc: IAccount,
      destination_acc: IAccount
    ):Promise<IAccount[]> {
      const simple_transfer1: simple_transfer = {
        account_id: Number(payload.source_account),
        new_balance: Number(source_acc.balance) - Number(payload.amount),
      };
      const simple_transfer2: simple_transfer = {
        account_id: Number(payload.destination_account),
        new_balance: Number(destination_acc.balance) + Number(payload.amount),
      };
      const results = await this.multiTransfer([simple_transfer1, simple_transfer2]);
      return results;
    }
     async  getReponseByIdempotencyKey(user: string, key : string | undefined = '') : Promise<RowDataPacket> {
      const sql = `SELECT response
            FROM Idempotency I 
            WHERE user = ? AND idempotency_key = ?;`;
      const [response] = (await db.query(sql, [user,key]))as RowDataPacket[][];
      return response[0];
    }
    async  getInfoByIdempotencyKey(user: string, key : string | undefined = '') : Promise<RowDataPacket> {
      const sql = `SELECT response,req_hash as 'db_hash'
            FROM Idempotency I 
            WHERE user = ? AND idempotency_key = ?;`;
      const [response]= (await db.query(sql, [user,key]))as RowDataPacket[];
      return response[0];
    }
    
     async  sameRequest(user: string, req_hash:string ,key : string | undefined = '') : Promise<RowDataPacket> {
      const sql = `SELECT response
            FROM Idempotency I 
            WHERE user = ? AND idempotency_key = ? AND req_hash = ?;`;
      const [response] = (await db.query(sql, [user, key, req_hash]))as RowDataPacket[][];
      return response[0];
    }
    
     async  logIdempotency(payload: Idempotency): Promise<number> {
      const sql1 = 'INSERT INTO Idempotency SET ?;';
      const [result] = (await db.query(sql1, payload)) as ResultSetHeader[];
      const id = result.insertId;
      return id;
    }
  generateRequestString(req : Request) {
      return req.method + JSON.stringify(req.url) + JSON.stringify(req.params) + JSON.stringify(req.body)
    }

  async  saveIdempotency(req : Request, outputResponse: IResponseMessage) :Promise<void> {
        if ('idempotency_key' in req.headers) {
            //create hash according to request
            const idem: Idempotency = {
                idempotency_key: req.headers.idempotency_key as string,
                user: "USER1",
                response: JSON.stringify(outputResponse),
                req_hash: this.generateRequestString(req)
            };
            await this.logIdempotency(idem);
        }
    }

  makeHash256 (string: string, salt:string){
    const sha256Hasher = crypto.createHmac("sha256",salt);
    const hash = sha256Hasher.update(string).digest("hex");
    return hash;
  }
}

const Util = new UtilDal();
export default Util;