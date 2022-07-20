const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')
const adminController = new AdminController
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware

router.post('/', adminMiddleware.validateAdmin, adminController.create)
router.post('/login', adminMiddleware.validateLogin, adminController.login)
router.get('/me', adminMiddleware.authenticateToken, adminController.me)

module.exports = router