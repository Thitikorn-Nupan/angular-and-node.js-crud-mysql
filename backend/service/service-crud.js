module.exports = crud = {}
const Tutorial = require('../entity/tutorial')
class ServiceCrud {
  reads = async () => {
    return await Tutorial.findAll();
  }
  read = async (tid) => {
    return await Tutorial.findAll({where : {tid : tid} }).then((tutorial) => {
      if (tutorial.length !== 0) {
        return tutorial
      }
      else {
        return false
      }
    });
  }
  create = async (title , description , published) => {
    return await Tutorial.create({title,description,published})
  }
  delete = async (tid) => {
    return await Tutorial.findAll({where: {tid: tid}}).then(async (tutorial) => {
      if (tutorial.length !== 0) {
        return await Tutorial.destroy({where: {tid: tid}}).then(() => {
          return true
        })
      } else {
        return false
      }
    })
  }
  deleteAll = async () => {
    await Tutorial.truncate();
  }
  update = async (tid , title , description , published) => {
    return await Tutorial.findAll({where: {tid: tid}}).then(async (tutorial) => {
      if (tutorial.length !== 0) {
        /*console.log('can update')
        console.log(tid , title , description , published)*/
        return await Tutorial.update( {title,description,published} , {where: {tid: tid}} ).then(() => {
          return true
        })
      } else {
        return false
      }
    })
  }

}

const serviceCrud = new ServiceCrud()
crud.crudOperator = serviceCrud
module.exports = crud
