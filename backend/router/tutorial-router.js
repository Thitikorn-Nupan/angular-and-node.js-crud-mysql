const myLog = require('../log/logging')
const myModules = require('../service/modules-service')
const crud = require('../service/crud-service')
const express = myModules.express
const tutorialRouter = express.Router()
const bodyParser = myModules.bodyParser
const cors = myModules.cors // cors it's very importance for angular !
/**
  Express is for building the Rest apis
  cors provides Express middleware to enable CORS with various options.
  CORS (Cross-Origin Resource Sharing) คือ กลไกที่ทำให้ server สามารถกำหนดสิทธิการเข้าถึงทรัพยากรได้ เมื่อมีเว็บไซต์ที่มี origin (domain) อื่น ใช้ HTTP request มายัง server
  in this case 8080 port I use it for back end
  CORS เป็นกลไกที่ web browser ใช้เวลาที่ client ส่ง request ไปยัง server ที่มี domain ต่างกัน
  corsOptions เพื่อบอกว่าจะอนุญาต domain ไหนสามารถ sent http method ได้
  angular default 4200
*/
const corsOptions = {
  origin : 'http://localhost:4200'
}
tutorialRouter.use(cors(corsOptions))
tutorialRouter.use(express.json())
tutorialRouter.use(express.urlencoded({ extended: true }));
tutorialRouter.use(
  bodyParser.urlencoded({
    extended: false,
}))

tutorialRouter.get('/reads' , async (req, res, next) => {
  try {
    await crud.crudOperator.reads().then(
      (result) => {
        myLog.log.debug(`reads() method success`)
        return res.status(202).json({
        status: "accepted",
        message: "All items successfully fetched.",
        data: result
      })
    }).catch((e) => {
      myLog.log.warn(`cause from reads() method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    myLog.log.warn(`cause from tutorialRouter get async method (reads) : ${e.message}`)
    throw e
  }
})

tutorialRouter.get('/read/(:tid)' , async (req, res, next) => {
  try {
    await crud.crudOperator.read(req.params['tid']).then((result) => {
      return res.status(202).json({
        status: "accepted",
        message: "Item successfully fetched.",
        data: result
      })
    }).catch((e) => {
      myLog.log.warn(`cause from read(tid) method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    myLog.log.warn(`cause from tutorialRouter get async method (read(tid)) : ${e.message}`)
    throw e
  }
})

tutorialRouter.post('/create' , async (req,res) => {
  try {
    const {title ,description , published} = req.body
    await crud.crudOperator.create(title ,description , published).then((result) => {
      return res.status(201).json({
        status: "create",
        data: result
      })
    }).catch((e) => {
      myLog.log.warn(`cause from create(title ,description , published) method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    res.status(405).json({
      status:'method not allowed',
      message : `cause from tutorialRouter post async method (create) : ${e.message}`
    })
    throw e
  }
})

tutorialRouter.delete('/delete/(:tid)' , async (req,res) => {
  try {
    await crud.crudOperator.delete(req.params['tid']).then((result) => {
      return res.status(200).json({
        status: "ok",
        data: result
      })
    }).catch((e) => {
      myLog.log.warn(`cause from delete(tid) method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    res.status(405).json({
      status:'method not allowed',
      message : `cause from tutorialRouter delete async method (delete(tid)) : ${e.message}`
    })
    throw e
  }
})

tutorialRouter.delete('/delete-all' , async (req,res) => {
  try {
    await crud.crudOperator.deleteAll().then(() => {
      return res.status(200).json({
        status: "ok",
        data: true
      })
    }).catch((e) => {
      myLog.log.warn(`cause from deleteAll() method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    res.status(405).json({
      status:'method not allowed',
      message : `cause from tutorialRouter delete async method (deleteAll()) : ${e.message}`
    })
    throw e
  }
})



tutorialRouter.put('/update/(:tid)' , async (req,res) => {
  try {
    const { _title ,_description ,_published } = req.body
    // why I use _ front of variable because I send it like Tutorial{_tid: 10, _title: 'Java & Spring', _description: 'no comment', _published: 'false'} */
    await crud.crudOperator.update(req.params['tid'],_title ,_description ,_published).then((result) => {
      return res.status(200).json({
        status: "ok",
        data: result
      })
    }).catch((e) => {
      myLog.log.warn(`cause from update(tid,title ,description , published) method await : ${e.message}`)
      throw e
    })
  } catch (e) {
    res.status(405).json({
      status:'method not allowed',
      message : `cause from tutorialRouter post async method (create) : ${e.message}`
    })
    throw e
  }
})

module.exports.tutorial = tutorialRouter
