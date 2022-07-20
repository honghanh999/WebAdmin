const Promotion = require('../models/PromotionModel')
const { renderJson } = require("../../util/app");

class PromotionController {
    async create(req, res) {
        const { admin } = req
        const { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate } = req.body
        const data = { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate, creator: admin._id }
        const promotion = await Promotion.create(data).
        res.json(renderJson(promotion))
    }
}

module.exports = PromotionController