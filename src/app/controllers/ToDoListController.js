// const ToDoList = require('../models/ToDoListModel')
// const { renderJson } = require('../../util/app')
// const {limit} = require("../config/models");
//
// class ToDoListController {
//     async create(req, res) {
//         try {
//             const { user } = req
//             const { title, description } = req.body
//             const data = {
//                 title,
//                 description,
//                 author: user.email
//             }
//             const item = await ToDoList.create(data)
//             res.json(renderJson({ item }))
//         } catch (error) {
//             res.json(renderJson({}, false, 400, error.message))
//         }
//     }
//
//     async read(req, res) {
//         try {
//             const { item } = req
//             res.json(renderJson({ item }))
//         } catch (error) {
//             res.json(renderJson({}, false, 400, error.message))
//         }
//     }
//
//     async edit(req, res) {
//         try {
//             const { item } = req
//             await ToDoList.updateOne({ _id: item._id }, {
//                 $set: {
//                     title: req.body.title,
//                     description: req.body.description
//                 }
//             })
//             const newItem = await ToDoList.findById(item._id)
//             console.log({ newItem })
//             res.json(renderJson({ item: newItem }))
//         } catch (error) {
//             res.json(renderJson({}, false, 400, error.message))
//         }
//     }
//
//     async delete(req, res) {
//         const { item } = req
//         await ToDoList.findOneAndDelete({ _id: item._id })
//         res.json(renderJson({}))
//     }
//
//     async index(req, res) {
//         try {
//             const { page, sort, search } = req.query
//             const skipPage = page * limit
//             const dbQuery = {
//                 author: req.user.email,
//                 title: new RegExp(search)
//             }
//
//             const items = await ToDoList.find(dbQuery).limit(limit).skip(skipPage).sort({ createdAt: sort })
//             const count = await ToDoList.count(dbQuery)
//             res.json(renderJson({ items, count, limit }))
//         } catch (error) {
//             res.json(renderJson({}, false, 400, error.message))
//         }
//     }
// }
//
// module.exports = ToDoListController