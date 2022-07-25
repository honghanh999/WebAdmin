const Cart = require('../models/CartModel')
const { renderJson, handleError} = require('../../util/app')
const Joi = require('joi')
const Product = require("../models/ProductModel");

class CartMiddleware {
    async validateCart(req, res, next) {
        const schema = Joi.object({
            product: Joi.required(),
            quantity: Joi.number().required(),
        })
        handleError(req, res, next, schema)
    }

    async validateProductId(req, res, next) {
        const schema = Joi.object({
            product: Joi.required()
        })
        handleError(req, res, next, schema)
    }
}

module.exports = CartMiddleware