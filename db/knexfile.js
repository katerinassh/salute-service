require('dotenv').config();

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
    directory: './migrations'
  },
  seeds: {
    directory: './seeds/dev'
  },
  useNullAsDefault: true
}
