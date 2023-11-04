/* Class for log message on console */
// declare myLog object for exporting method in Logging class
// module.exports = {}
module.exports = myLog = {} // myLog is name variable
class Logging {
    get #winston() { /* # it means private method */
        const {createLogger , format , transports} = require('winston')
        return {createLogger , format , transports}
    }
    get log () {
        const path = require('path')
        return this.#winston.createLogger({
            level : 'silly' ,
            format : this.#winston.format.
            combine(
                this.#winston.format.label({label : path.basename(process.mainModule.filename)}) ,
                this.#winston.format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}) ,
                this.#winston.format.printf((info) => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
            ) ,
            transports : [ new this.#winston.transports.Console ]
        })
    }
}

myLog.log = new Logging().log // add method to myLog object
/*
    Maybe like
    myLog = {
       log : new Logging().log
    }
*/
