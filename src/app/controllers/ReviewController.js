const reviewService = require('../services/ReviewService')
const { renderJson, handler } = require("../../util/app");

class ReviewController {
    async create(req, res) {
        const [error, result] = await handler(reviewService.create(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async update(req, res) {
        const [error, result] = await handler(reviewService.update(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async delete(req, res) {
        const [error, result] = await handler(reviewService.deleteReview(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async getOwnReview(req, res) {
        const [error, result] = await handler(reviewService.getOwnReview(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async getProductReview(req, res) {
        const [error, result] = await handler(reviewService.getProductReview(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = ReviewController