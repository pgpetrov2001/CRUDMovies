require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'crudmovies',
  user: process.env.DB_USER || 'crudmoviesuser',
  password: process.env.DB_PASSWORD || 'password',
  schema: 'public',
  migrationsTable: 'pgmigrations',
};
