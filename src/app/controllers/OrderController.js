const Order = require('../models/OrderModel')
const Cart = require('../models/CartModel')
const { renderJson } = require('../../util/app')
const { cartStatus, populateOrderDefault } = require("../config/models");
const { limit } = require('../config/models')


class OrderController {
    async order(req, res) {
        try {
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
            return res.json(renderJson({ order }))
        }
         catch(error) {
             res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async getOrder(req, res) {
        try {
            const { order } = req
            await order.populate(populateOrderDefault)
            res.json(renderJson(order))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async index(req, res) {
        try {
            const { page, search } = req.query
            const skipPage = limit * page
            const dbQuery = {
                _id: search
            }
            const order = await Order.find(dbQuery).limit(limit).skip(skipPage).populate(populateOrderDefault)
            res.json(renderJson(order))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = OrderController