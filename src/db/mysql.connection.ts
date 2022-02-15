import mysql from 'mysql2/promise';
import log from '@ajar/marker';
import config from '../config.js';

const {
  DB_HOST, DB_PORT, DB_NAME, DB_USER_NAME, DB_USER_PASSWORD,
} = config.mysql_connection;

export let connection: mysql.Connection;

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
