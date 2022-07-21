const express = require('express')
const router = express.Router()
const CartController = require('../app/controllers/CartController')
const cartController = new CartController
const ClientController = require('../app/controllers/ClientController')
const clientController = new ClientController
const CartMiddleware = require('../app/middlewares/CartMiddleware')
const cartMiddleware = new CartMiddleware
const ClientMiddleware = require('../app/middlewares/ClientMiddleware')
const clientMiddleware = new ClientMiddleware
const ProductMiddleware = require('../app/middlewares/ProductMiddleware')
const productMiddleware = new ProductMiddleware

router.post('/', clientMiddleware.authenticateToken, cartMiddleware.findProduct, cartController.addToCart)
router.delete('/:id', clientMiddleware.authenticateToken, productMiddleware.findId, cartController.deleteProductInCart)
router.put('/', clientMiddleware.authenticateToken, cartMiddleware.findProduct, cartController.updateQuantity)

module.exports = router