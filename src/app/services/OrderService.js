const Order = require('../models/OrderModel')
const { populateOrderDefault, cartStatus, limit } = require("../config/models");
const Cart = require("../models/CartModel");

const order = async (req) => {
    const mappingProductPrice = {}
    const carts = []
    const { recipient, address, phoneNumber, paymentMethod, products } = req.body
    const { user, cartChecked, productChecked } = req
    let totalPrice = 0
    for (const product of productChecked) {
        mappingProductPrice[product._id] = product.price
    }
    for (const cart of cartChecked) {
        totalPrice += mappingProductPrice[cart.product] * cart.quantity
        carts.push(cart._id)
    }
    const dataOrder = {
        carts,
        totalPrice,
        user: user._id,
        recipient,
        address,
        phoneNumber,
        paymentMethod,
        mappingProductPrice
    }
    const order = await Order.create(dataOrder)
    await order.populate(populateOrderDefault)
    await Cart.updateMany({ product: { $in: products }, status: cartStatus.addNew }, {
        $set: {
            status: cartStatus.completed
        }
    })
    return order
}

const read = async (req) => {
    const { order } = req
    return order.populate(populateOrderDefault)
}

const get = async (req) => {
    const { user } = req
    const { page, search } = req.query
    const skipPage = limit * page
    const dbQuery = {
        _id: search
    }
    if (search) {
        return Order.find(dbQuery).limit(limit).skip(skipPage).populate(populateOrderDefault)
    }
    return Order.find({ user: user._id }).limit(limit).skip(skipPage).populate(populateOrderDefault)
}

module.exports = {
    order,
    read,
    get
}