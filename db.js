import { Pool } from 'pg';

export const pool = new Pool({
  user: 'crudmoviesuser',
  host: 'localhost',
  database: 'crudmovies',
  password: 'password',
  port: 5432,
});
