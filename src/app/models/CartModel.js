const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { cartStatus } = require('../config/models')

const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    status: {
        type: String,
        enum: cartStatus.all,
        required: true
    }
})

module.exports = mongoose.model('Cart', CartSchema)