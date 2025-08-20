const myRouter = require('../router/tutorial-router')
const application = require('../service/modules-service').express()
const myLog = require('../log/logging')

class EndpointControl {

  constructor() {
    application.use('/api/tutorial', myRouter.tutorial)
    application.listen(8080, (error) => {
      if (error) {
        throw errors
      } else {
        myLog.log.debug('Server listening on port 8080')
      }
    })
  }
}

new EndpointControl()
