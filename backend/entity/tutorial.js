const { DataTypes } = require('../config/configuration').sequelize
const sequelizeConfig = require('../config/configuration').sequelizeConfig
const Tutorial = sequelizeConfig.define(
  'tutorials' , {
    tid : {
      type : DataTypes.INTEGER ,
      primaryKey : true,
      autoIncrement: true
    } ,
    title : {
      type : DataTypes.STRING
    } ,
    description : {
      type : DataTypes.STRING
    } ,
    published : {
      type : DataTypes.BOOLEAN
    }
  } ,
  {
    // freeze name table not using *s on name
    freezeTableName: true ,
    // don't use createdAt/update
    timestamps: false
  }
)

module.exports = Tutorial
