import pg, { PoolClient } from "pg";
import { config } from "../common/config/index";

const Pool = pg.Pool;

const pool = new Pool({
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  user: config.dbUser,
});

export class Postgres {
  async fetch<ResponseType, ARGType = any>(
    sql: string,
    ...arg: ARGType[]
  ): Promise<ResponseType> {
    const client: PoolClient = await pool.connect();

    try {
      const {
        rows: [data],
      } = await client.query(sql, arg);

      return data;
    } finally {
      client.release();
    }
  }

  async fetchAll<ResponseType, ARGType = any>(
    sql: string,
    ...arg: ARGType[]
  ): Promise<ResponseType[]> {
    const client: PoolClient = await pool.connect();

    try {
      const { rows } = await client.query(sql, arg);

      return rows;
    } finally {
      client.release();
    }
  }
}
