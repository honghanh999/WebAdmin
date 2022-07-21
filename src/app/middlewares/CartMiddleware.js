const Cart = require('../models/CartModel')
const Product = require('../models/ProductModel')
const { renderJson } = require('../../util/app')
const { ObjectId } = require('mongoose').Types

class CartMiddleware {
    async findId(req, res, next) {
        try {
            const { id } = req.params
            const cart = await Cart.findById(id)
            if (!cart) {
                res.status(404).json(renderJson({}, false, 404, 'Not found'))
            } else {
                req.cart = cart
                next()
            }
        } catch (error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async findProduct(req, res, next) {
        try {
            const { product }  = req.body
            const valid = ObjectId.isValid(product)
            if (!valid) {
                return res.status(404).json(renderJson({}, false, 404, "Not found"))
            }
            const productChecked = await Product.findOne({ _id: product })
            if (!productChecked) {
                res.status(404).json(renderJson({}, false, 404, "Not found"))
            } else {
                req.product = productChecked
                next()
            }
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = CartMiddleware