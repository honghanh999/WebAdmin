const Review = require('../models/ReviewModel')

const Joi = require('joi')
const { handleError, renderJson } = require("../../util/app");

class ReviewMiddleware {
    async validateReview(req, res, next) {
        const schema = Joi.object({
            score: Joi.number().allow('1', '2', '3', '4', '5').required(),
            comment: Joi.string().required(),
            product: Joi.required()
        })
        handleError(req, res, next, schema)
    }

    async findId(req, res, next) {
        try {
            const { id } = req.params
            const review = await Review.findById(id)
            if (!review) {
                return res.status(404).json(renderJson({}, false, 404, 'Not found'))
            } else {
                req.review = review
                next()
            }
        } catch (error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async validatePageSearch (req, res, next) {
        const pageSearch = Joi.object({
            page: Joi.number().default(0),
            search: Joi.string()
        })
        handleError(req, res, next, pageSearch)
    }
}

module.exports = ReviewMiddleware