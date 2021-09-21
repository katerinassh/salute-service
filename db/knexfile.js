require('dotenv').config();

const {
  DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT,
} = process.env;

module.exports = {
  client: 'pg',
  connection: {
    user: 'katerina',
    database: 'salute-db',
    password: '12345',
    host: 'localhost',
    port: 5432,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds/dev',
  },
  useNullAsDefault: true,
};
