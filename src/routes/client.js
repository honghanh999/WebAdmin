const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const productController = new ProductController
const ProductMiddleware = require('../app/middlewares/ProductMiddleware')
const productMiddleware = new ProductMiddleware
const UserMiddleware = require('../app/middlewares/UserMiddleware')
const userMiddleware = new UserMiddleware
const UserController = require('../app/controllers/UserController')
const userController = new UserController
const CartController = require('../app/controllers/CartController')
const cartController = new CartController
const CartMiddleware = require('../app/middlewares/CartMiddleware')
const cartMiddleware = new CartMiddleware
const OrderController = require('../app/controllers/OrderController')
const orderController = new OrderController
const OrderMiddleware = require('../app/middlewares/OrderMiddleware')
const orderMiddleware = new OrderMiddleware
const ReviewController = require('../app/controllers/ReviewController')
const reviewController = new ReviewController
const ReviewMiddleware = require('../app/middlewares/ReviewMiddleware')
const reviewMiddleware = new ReviewMiddleware

router.get('/product', productMiddleware.validatePageSearch, productController.index)
router.get('/product/:id', productMiddleware.findId, productController.read)
router.post('/user/register', userMiddleware.validateRegister, userController.register)
router.post('/user/login', userMiddleware.validateLogin, userController.login)
router.post('/cart', userMiddleware.authenticateToken, cartMiddleware.validateCart, productMiddleware.findProduct, cartController.addToCart)
router.delete('/cart', userMiddleware.authenticateToken, cartMiddleware.validateProductId, productMiddleware.findProduct, cartController.deleteProductInCart)
router.put('/cart', userMiddleware.authenticateToken, cartMiddleware.validateCart, productMiddleware.findProduct, cartController.updateQuantity)
router.post('/order', userMiddleware.authenticateToken, orderMiddleware.validateOrder, orderMiddleware.checkProducts, orderController.order)
router.get('/order', userMiddleware.authenticateToken, orderMiddleware.validatePageSearch, orderController.index)
router.get('/order/:id', userMiddleware.authenticateToken, orderMiddleware.checkOrderId, orderController.getOrder)
router.post('/review', userMiddleware.authenticateToken, reviewMiddleware.validateReview, productMiddleware.findProduct, reviewMiddleware.storeImages, reviewController.create)
router.get('/review/product/:id', productMiddleware.findId, reviewMiddleware.validateGetReview, reviewMiddleware.validatePage, reviewController.getProductReview)
router.put('/review/:id', userMiddleware.authenticateToken, reviewMiddleware.findId, reviewMiddleware.storeImages, reviewController.update)
router.delete('/review/:id', userMiddleware.authenticateToken, reviewMiddleware.findId, reviewController.delete)
router.get('/review/', userMiddleware.authenticateToken, reviewMiddleware.validatePage, reviewController.getOwnReview)

module.exports = router