const dbDetails = require('./db.details')
module.exports = config = {} /* declare config empty object  */
class SeqConfiguration {

  get sequelize() {
    return require('sequelize')
  }

  get sequelizeConfig() {
    return new this.sequelize(dbDetails.DB, dbDetails.USER, dbDetails.PASSWORD , {
      dialect: dbDetails.dialect,
      // operatorsAliases: false,
      host: dbDetails.HOST,
      port: dbDetails.PORT,
      pool: {
        max: dbDetails.pool.max,
        min: dbDetails.pool.min,
        acquire: dbDetails.pool.acquire,
        idle: dbDetails.pool.idle
      }
    });

  }
}

/*new SeqConfiguration().sequelizeConfig.sync().then(() => {
  console.log('connected successfully!!')
}).catch((error) => {
  console.log('message : failed connect!!')
  throw error
})*/

const seqConfiguration = new SeqConfiguration()
module.exports.sequelize = seqConfiguration.sequelize
module.exports.sequelizeConfig = seqConfiguration.sequelizeConfig
