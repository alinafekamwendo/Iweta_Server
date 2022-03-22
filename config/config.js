// config.js
require('dotenv').config();
const {DB, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports=
{  
  "development": {
    "url":DATABASE_URL,
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
          rejectUnauthorized: false
      }
  }
  },
  "test": {
    "url":DATABASE_URL,
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
          rejectUnauthorized: false
      }
  }
  },
  "production": {
    "url":DATABASE_URL,
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB,
    "host": DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
          rejectUnauthorized: false
      }
  }
}
}
