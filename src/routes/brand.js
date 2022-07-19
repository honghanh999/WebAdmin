const express = require('express')
const router = express.Router()

const BrandController = require('../app/controllers/BrandController')
const brandController = new BrandController
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware
const BrandMiddleware = require('../app/middlewares/BrandMiddleware')
const brandMiddleware = new BrandMiddleware

router.post('/', adminMiddleware.authenticateToken, brandController.create)
router.get('/:id', adminMiddleware.authenticateToken, brandMiddleware.findId, brandController.read)
router.put('/:id', adminMiddleware.authenticateToken, brandMiddleware.findId, brandController.update)
router.delete('/:id', adminMiddleware.authenticateToken, brandMiddleware.findId, brandController.delete)
router.get('/', adminMiddleware.authenticateToken, brandController.index)

module.exports = router