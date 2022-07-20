const express = require('express')
const router = express.Router()
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware
const PromotionController = require('../app/controllers/PromotionController')
const promotionController = new PromotionController

router.post('/', adminMiddleware.validateAdmin, promotionController.create)

module.exports = router