const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, {
    timestamps: true
})

// ImageSchema.index({
//     fileName: 1
// })

module.exports = mongoose.model('Image', ImageSchema)