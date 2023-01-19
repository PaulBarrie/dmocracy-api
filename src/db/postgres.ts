
const { Sequelize } = require('sequelize');


const host = process.env.POSTGRES_HOST || 'postgres';
const port = process.env.POSTGRES_PORT || 5432;
const database = process.env.POSTGRES_DB || 'postgres';
const username = process.env.POSTGRES || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
  });
  