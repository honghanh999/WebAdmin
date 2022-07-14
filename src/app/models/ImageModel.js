const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    fileType: {
        type: String,
        enum: ['avatar', 'banner'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

ImageSchema.index({
    fileName: 1
})

module.exports = mongoose.model('Image', ImageSchema)