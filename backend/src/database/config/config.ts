import 'dotenv/config';
import { Options } from 'sequelize';

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT
} = process.env;

const config: Options = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: Number(DB_PORT),
  dialect: 'postgres',
}

module.exports = config;
