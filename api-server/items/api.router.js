const express = require('express');
const middleware = require('./api.middlware')
const controller = require('./api.controller')
const bodyParser = require("body-parser")
const Middleware = require('../middleware/global.middleware')

const router = express.Router();

router.use(bodyParser.json())





router.post('/', middleware.ValidateItem, Middleware.checkApi_key, controller.Createitems)

router.get('/', controller.Getitems)

router.get('/:id', controller.getOneitem)
 
router.patch('/:id', Middleware.checkApi_key, controller.updateitem)
router.delete('/:id', Middleware.checkApi_key, controller.deleteitem)

module.exports = router
