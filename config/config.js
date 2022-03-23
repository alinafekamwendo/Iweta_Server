// config.js

require('dotenv').config();
const {DB, DB_HOST, DB_USERNAME, DB_PASSWORD,DATABASE_URL } = process.env;
module.exports=
{
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable":"DATABASE_URL",
    "dialect": "postgres"
  }
}