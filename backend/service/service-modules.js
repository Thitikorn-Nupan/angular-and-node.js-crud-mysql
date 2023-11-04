module.exports = myModules = {}
class ServiceModules {
  #express = require('express')
  #cors = require('cors')
  #path = require('path')
  #bodyParser = require('body-parser')

  get express () {
    return this.#express
  }
  get cors () {
    return this.#cors
  }

  get path () {
    return this.#path
  }
  get bodyParser() {
    return this.#bodyParser
  }

}
const service = new ServiceModules()

myModules.express = service.express
myModules.path = service.path
myModules.cors = service.cors
myModules.bodyParser = service.bodyParser
