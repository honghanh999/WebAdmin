const Promotion = require('../models/PromotionModel')
const {renderJson, handleError} = require("../../util/app");
const Product = require("../models/ProductModel");
const Joi = require('joi')

class PromotionMiddleware {
    async checkId(req, res, next) {
        try {
            const { id } = req.params
            const promotion = await Promotion.findById(id)
            if (!promotion) {
                res.status(404).json(renderJson({}, false, 404, 'not found'))
            } else {
                req.promotion = promotion
                next()
            }
        } catch(error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async validatePromotion(req, res,next) {
        const schema = Joi.object({
            title: Joi.string().required(),
            code: Joi.string().required(),
            description: Joi.string().required(),
            percentOff: Joi.number().required(),
            minPurchaseQuantity: Joi.number().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
        })
        handleError(req, res, next, schema)
    }
}

module.exports = PromotionMiddleware