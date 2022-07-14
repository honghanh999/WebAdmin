// const ToDoList = require("../models/ToDoListModel");
// const { renderJson, handleError} = require("../../util/app");
// const { validateEmail } = require('../../util/db')
//
// const Joi = require('joi')
//
// class ToDoListMiddleware {
//     validatePost(req, res, next) {
//         const schemaToDoList = Joi.object ({
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//         })
//         handleError(req, res, next, schemaToDoList)
//     }
//
//     async findId (req, res, next) {
//         // const user = await ToDoList.find({ author })
//         const { id } = req.params
//         const item = await ToDoList.findOne({
//             author: req.user.email,
//             _id: id
//         })
//         if (!item) {
//             res.json(renderJson({}, false, 404, 'not found'))
//         } else {
//             req.item = item
//             next()
//         }
//     }
// }
// module.exports = ToDoListMiddleware