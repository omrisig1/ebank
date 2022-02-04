import mysql from 'mysql2/promise';
import log from '@ajar/marker';
import config from '../../config.json';

const {
  DB_HOST, DB_PORT, DB_NAME, DB_USER_NAME, DB_USER_PASSWORD,
} = config['mysql-connection'];

// eslint-disable-next-line import/no-mutable-exports
export let connection: mysql.Connection;

// eslint-disable-next-line consistent-return
export const connect = async (): Promise<mysql.Connection | void> => {
  if (connection) {
    return connection;
  }
  connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER_NAME,
    password: DB_USER_PASSWORD,
  });
  await connection.connect();
  log.magenta(' ✨  Connected to MySql DB ✨ ');
};
