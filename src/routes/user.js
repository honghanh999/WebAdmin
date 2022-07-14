const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
const userController = new UserController
const UserMiddleware = require('../app/middlewares/UserMiddleware')
const userMiddleware = new UserMiddleware
const AdminMiddleware = require('../app/middlewares/AdminMiddleware')
const adminMiddleware = new AdminMiddleware

router.post('/', adminMiddleware.authenticateToken, userController.create)
router.get('/', adminMiddleware.authenticateToken, userController.list)
router.post('/lock/:id', adminMiddleware.authenticateToken, userMiddleware.findId, userController.lock)
router.post('/unlock/:id', adminMiddleware.authenticateToken, userMiddleware.findIdLockedUser, userController.unlock)

module.exports = router