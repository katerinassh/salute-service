require('dotenv').config();

const {
  DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT,
} = process.env;

module.exports = {
  client: 'pg',
  connection: {
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds/dev',
  },
  useNullAsDefault: true,
};
