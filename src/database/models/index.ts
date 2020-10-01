import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV || "development"
const configDb = require('../config')[env]
const url = configDb.url || process.env.DATABASE_CONNECTION_URL;

const db = {
  sequelize: new Sequelize(url as string, configDb)
}


export default db
