const promotionService = require('../services/PromotionService')
const { renderJson, handler } = require("../../util/app");

class PromotionController {
    async create(req, res) {
        const [error, result] = await handler(promotionService.store(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async read(req, res) {
        const [error, result] = await handler(promotionService.read(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async update(req, res) {
        const [error, result] = await handler(promotionService.update(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async delete(req, res) {
        const [error, result] = await handler(promotionService.deletePromotion(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async index(req, res) {
        const [error, result] = await handler(promotionService.get(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = PromotionController