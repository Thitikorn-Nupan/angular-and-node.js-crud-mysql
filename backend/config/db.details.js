const dotenv = require('dotenv')
const path = require('../service/modules-service').path
dotenv.config({ path : path.resolve('../backend/env/.env') ,debug:true})

module.exports  = {
  HOST:  process.env.SQL_HOST,
  PORT:  process.env.SQL_PORT,
  USER:  process.env.SQL_USERNAME,
  PASSWORD:  process.env.SQL_PASSWORD,
  DB: process.env.SQL_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
