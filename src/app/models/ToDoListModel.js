// const mongoose = require('mongoose')
// const {validateEmail} = require("../../util/db");
// const Schema = mongoose.Schema
//
//
// const ToDoListSchema = new Schema({
//     title: {
//         type: String,
//         require: true
//     },
//     description: {
//         type: String,
//         require: true
//     },
//     author: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         require: true,
//         validate: [validateEmail, 'Invalid email']
//     },
// }, {
//     timestamps: true
// })
// module.exports = mongoose.model('ToDoList', ToDoListSchema)
