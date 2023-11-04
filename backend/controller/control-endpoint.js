const myRouter = require('../router/router-tutorial')
const application = require('../service/service-modules').express()
class ControlEndpoint {
  constructor() {
    application.use('/api/tutorial',myRouter.tutorial)
    application.listen(8080 , (error)  => {if (error) throw errors})
  }
}

new ControlEndpoint()
