const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const productController = new ProductController
const ProductMiddleware = require('../app/middlewares/ProductMiddleware')
const productMiddleware = new ProductMiddleware
const ClientMiddleware = require('../app/middlewares/ClientMiddleware')
const clientMiddleware = new ClientMiddleware
const ClientController = require('../app/controllers/ClientController')
const clientController = new ClientController

router.get('/', clientMiddleware.authenticateToken, productController.index)
router.get('/:id', clientMiddleware.authenticateToken, productMiddleware.findId, productController.read)
router.post('/', clientMiddleware.validateClient, clientController.create)
router.post('/login', clientMiddleware.validateLogin, clientController.login)

module.exports = router