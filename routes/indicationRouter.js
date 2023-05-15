const Router = require('express')
const router=new Router()
const indicationController = require('../controllers/indicationController')

router.post('/',indicationController.create)
router.get('/',indicationController.getAll)


module.exports =router