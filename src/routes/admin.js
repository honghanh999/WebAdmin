const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')
const adminController = new AdminController
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware
const UserController = require('../app/controllers/UserController')
const userController = new UserController
const UserMiddleware = require('../app/middlewares/UserMiddleware')
const userMiddleware = new UserMiddleware

router.post('/', adminMiddleware.validateAdmin, adminController.create)
router.post('/login', adminMiddleware.validateLogin, adminController.login)
router.get('/me', adminMiddleware.authenticateToken, adminController.me)
router.get('/user', adminMiddleware.authenticateToken, userController.list)
router.post('/user/lock/:id', adminMiddleware.authenticateToken, userMiddleware.findId, userController.lock)
router.post('/user/unlock/:id', adminMiddleware.authenticateToken, userMiddleware.findIdLockedUser, userController.unlock)

module.exports = router