const dotenv = require('dotenv')
const path = require('../service/service-modules').path

dotenv.config({ path : path.resolve('../env/.env') })
// console.log(path.resolve('../env/.env'))
module.exports  = {
  HOST:  process.env.SQLX_HOST,
  USER:  process.env.SQLX_USERNAME,
  PASSWORD:  process.env.SQLX_PASSWORD,
  DB: process.env.SQLX_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
