const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const productController = new ProductController
const ProductMiddleware = require('../app/middlewares/ProductMiddleware')
const productMiddleware = new ProductMiddleware
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware
const BrandMiddleware = require('../app/middlewares/BrandMiddleware')
const brandMiddleware = new BrandMiddleware

router.post('/', adminMiddleware.authenticateToken, brandMiddleware.findBrand, productMiddleware.validateProduct, productController.create)
router.get('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.read)
router.put('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.update)
router.delete('/:id', adminMiddleware.authenticateToken, productMiddleware.findId, productController.delete)
router.get('/', adminMiddleware.authenticateToken, productMiddleware.validatePageSearch, productController.index)

module.exports = router