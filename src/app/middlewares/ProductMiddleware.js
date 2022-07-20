const Product = require('../models/ProductModel')
const { renderJson, handleError } = require('../../util/app')
const Joi = require('joi')

class ProductMiddleware {
    async findId(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findById(id)
            if (!product) {
                res.status(404).json(renderJson({}, false, 404, 'Not found'))
            } else {
                req.product = product
                next()
            }
        } catch (error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async validateProduct(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().required(),
            brand: Joi.string().required(),
            code: Joi.string().required(),
            amount: Joi.number().required(),
            price: Joi.number().required(),
            screen: Joi.string().required(),
            CPU: Joi.string().required(),
            frontCamera: Joi.string().required(),
            afterCamera: Joi.string().required(),
            RAM: Joi.number().required(),
            ROM: Joi.number().required(),
            memoryStick: Joi.number().required(),
            sim: Joi.number().required(),
        })
        if (!req.files || !req.files.image ) {
            return res.json(renderJson({}, false, 400, "Image is required"))
        }
        handleError(req, res, next, schema)
    }
}

module.exports = ProductMiddleware