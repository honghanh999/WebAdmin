const express = require('express')
const router = express.Router()
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware
const PromotionController = require('../app/controllers/PromotionController')
const promotionController = new PromotionController
const PromotionMiddleware = require('../app/middlewares/PromotionMiddleware')
const promotionMiddleware = new PromotionMiddleware

router.post('/', adminMiddleware.authenticateToken, promotionMiddleware.validatePromotion, promotionController.create)
router.get('/:id', adminMiddleware.authenticateToken, promotionMiddleware.checkId, promotionController.read)
router.put('/:id', adminMiddleware.authenticateToken, promotionMiddleware.checkId, promotionMiddleware.validateUpdatePromotion, promotionController.update)
router.delete('/:id', adminMiddleware.authenticateToken, promotionMiddleware.checkId, promotionController.delete)
router.get('/', adminMiddleware.authenticateToken, promotionController.index)

module.exports = router