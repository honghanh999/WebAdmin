const Order = require("../models/OrderModel");
const Joi = require('joi')
const { handleError, renderJson } = require("../../util/app");
const { paymentMethod } = require("../config/models");


class OrderMiddleware {
    async validateOrder(req, res, next) {
        const schema = Joi.object({
            products: Joi.required(),
            recipient: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            paymentMethod: Joi.any().allow(paymentMethod.ATM, paymentMethod.cash, paymentMethod.VISA).required(),
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
}

module.exports = OrderMiddleware