const dbDetails = require('./db.details')
module.exports = config = {} /* declare config empty object  */
class Configuration {
  get sequelize() {
    return require('sequelize')
  }
  get sequelizeConfig() {
    return new this.sequelize(dbDetails.DB, dbDetails.USER, dbDetails.PASSWORD , {
      dialect: dbDetails.dialect,
      operatorsAliases: false,
      host: process.env.SQLX_HOST,
      port: process.env.SQLX_PORT,
      pool: {
        max: dbDetails.pool.max,
        min: dbDetails.pool.min,
        acquire: dbDetails.pool.acquire,
        idle: dbDetails.pool.idle
      }
    });

  }
}

/*new Configuration().sequelizeConfig.sync().then(() => {
  console.log('connected successfully!!')
}).catch((error) => {
  console.log('message : failed connect!!')
  throw error
})*/

const configuration = new Configuration()

module.exports.sequelize = configuration.sequelize
module.exports.sequelizeConfig = configuration.sequelizeConfig
