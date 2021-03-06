const mongoose = require('mongoose')
const { paymentMethod} = require("../config/models");
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    carts: [{
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    }],
    totalPrice: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: paymentMethod.all,
        required: true
    },
    mappingProductPrice: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Order', OrderSchema)