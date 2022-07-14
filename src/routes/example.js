const express = require('express')
const router = express.Router()
const ExampleController = require('../app/controllers/ExampleController')
const exampleController = new ExampleController

router.post('/store', exampleController.store)

module.exports = router