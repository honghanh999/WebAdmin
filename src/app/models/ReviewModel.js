const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { score } = require('../config/models')

const ReviewSchema = new Schema({
    score: {
        type: Number,
        enum: score.all,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "ImageUser",
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema)