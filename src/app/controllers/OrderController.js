const Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')
const Cart = require('../models/CartModel')
const { renderJson } = require('../../util/app')
const { cartStatus } = require("../config/models");
const { ObjectId } = require('mongoose').Types


class OrderController {
    async order(req, res) {
        try {
            const { recipient, address, phoneNumber, paymentMethod } = req.body
            const { user } = req
            const { products } = req.body
            const price = []
            const carts = []
            var totalPrice = 0
            for (const product of products) {
                const validObjectId = ObjectId.isValid(product)
                if (!validObjectId) {
                    return res.status(404).json(renderJson({}, false, 404, "At least one of products is not found"))
                }
                const cartChecked = await Cart.findOne({ product: product, status: cartStatus.addNew })
                await Cart.updateOne({ product: product, status: cartStatus.addNew }, {
                    $set: {
                        status: cartStatus.completed
                    }
                })
                const productChecked = await Product.findById(product)
                if (!cartChecked) {
                    return res.status(404).json(renderJson({}, false, 404, "At least one of products is not found"))
                } else {
                    price.push(cartChecked.quantity * productChecked.price)
                    carts.push(cartChecked._id)
                }
            }
            for (let i = 0; i < price.length; i++) {
                totalPrice += price[i]
            }
            const dataOrder = {
                carts,
                totalPrice,
                user: user._id,
                recipient,
                address,
                phoneNumber,
                paymentMethod,
            }
            const order = await Order.create(dataOrder)
            await order.populate(['user',
                {
                    path: "carts",
                    populate: {
                        path: "product"
                    }
                }
            ])
            return res.json(renderJson({ order }))
        }
         catch(error) {
             res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = OrderController