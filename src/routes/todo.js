// const express = require('express')
// const router = express.Router()
// const ToDoListController = require('../app/controllers/ToDoListController')
// const toDoListController = new ToDoListController
// const UserMiddleware = require('../app/middlewares/UserMiddleware')
// const userMiddleware = new UserMiddleware
// const TodoListMiddleware = require('../app/middlewares/ToDoListMiddleware')
// const toDoListMiddleware = new TodoListMiddleware
//
// router.post('/', userMiddleware.authenticateToken, toDoListMiddleware.validatePost, toDoListController.create)
// router.get('/:id', userMiddleware.authenticateToken, toDoListMiddleware.findId, toDoListController.read)
// router.put('/:id', userMiddleware.authenticateToken, toDoListMiddleware.findId, toDoListMiddleware.validatePost, toDoListController.edit)
// router.delete('/:id', userMiddleware.authenticateToken, toDoListMiddleware.findId, toDoListController.delete)
// router.get('/', userMiddleware.authenticateToken, toDoListController.index)
//
// module.exports = router
