const Order = require("../models/OrderModel");
const Joi = require('joi')
const { handleError, renderJson } = require("../../util/app");
const { paymentMethod, cartStatus} = require("../config/models");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const { ObjectId } = require('mongoose').Types

class OrderMiddleware {
    async validateOrder(req, res, next) {
        const schema = Joi.object({
            products: Joi.required(),
            recipient: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            paymentMethod: Joi.string().valid(...paymentMethod.all).required()
        })
        handleError(req, res, next, schema)
    }

    async checkOrderId(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.findById(id)
            if (!order) {
                return res.status(404).json(renderJson({}, false, 404, "not found"))
            }
            req.order = order
            next()
        } catch(error) {
            return res.status(404).json(renderJson({}, false, 404, "not found"))
        }
    }

    async validatePageSearch(req, res, next) {
        const validate = Joi.object({
            page: Joi.number().default(0),
            search: Joi.string()
        })
        handleError(req, res, next, validate)
    }

    async checkProducts(req, res, next) {
        const { products } = req.body
        req.cartChecked = []
        req.productChecked = []
        for (const product of products) {
            const validObjectId = ObjectId.isValid(product)
            if (!validObjectId) {
                return res.status(404).json(renderJson({}, false, 404, "At least one of products is not found"))
            }
            const cartChecked = await Cart.findOne({ product: product, status: cartStatus.addNew })
            const productChecked = await Product.findById(product)
            if (!cartChecked || !productChecked) {
                return res.status(404).json(renderJson({}, false, 404, "At least one of products is not found"))
            } else {
                req.cartChecked.push(cartChecked)
                req.productChecked.push(productChecked)
            }
        }
        next()
    }
}

module.exports = OrderMiddleware