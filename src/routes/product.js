const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const productController = new ProductController
const ProductMiddleware = require('../app/middlewares/ProductMiddleware')
const productMiddleware = new ProductMiddleware
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware

router.post('/', adminMiddleware.authenticateToken, productController.create)
router.get('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.read)
router.put('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.update)
router.delete('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.delete)
router.get('/', adminMiddleware.authenticateToken, productController.index)

module.exports = router