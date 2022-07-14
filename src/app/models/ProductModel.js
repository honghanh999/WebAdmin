const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    screen: {
        type: String,
        required: true
    },
    CPU: {
        type: String,
        required: true
    },
    frontCamera: {
        type: String,
        required: true
    },
    afterCamera: {
        type: String,
        required: true
    },
    RAM: {
        type: Number,
        required: true
    },
    ROM: {
        type: Number,
        required: true
    },
    memoryStick: {
        type: Number,
        required: true
    },
    sim: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)