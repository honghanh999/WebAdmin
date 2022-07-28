const Order = require('../models/AdminModel')
const Joi = require('joi')
const { handleError, renderJson } = require("../../util/app");
const { method } = require("../config/models");

class OrderMiddleware {
    async validateOrder(req, res, next) {
        const { paymentMethod } = req.body
        const schema = Joi.object({
            products: Joi.required(),
            recipient: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            paymentMethod: Joi.string().required()
        })
        if (paymentMethod !== method.cash && paymentMethod !== method.bankCard ) {
            return res.json(renderJson({}, false, 400, "paymentMethod is invalid"))
        }
        handleError(req, res, next, schema)
    }
}

module.exports = OrderMiddleware