const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { imageUser } = require('../config/models/index')

const ImageUserSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ImageUser', ImageUserSchema)