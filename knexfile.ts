import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }
};

export default config;