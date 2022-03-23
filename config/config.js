// config.js

require('dotenv').config();
const {DB, DB_HOST, DB_USERNAME, DB_PASSWORD} = process.env;
module.exports=
{
  "development": {
    "use_env_variable":"DATABASE_URL",
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
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres",
   "ssl":"true"
  },
}