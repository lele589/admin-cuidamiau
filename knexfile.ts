import { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  migrations: {
    directory: path.join(__dirname, 'src/database/migrations'),
  },
  useNullAsDefault: true, // Needed for SQLite
};

export default config;
    