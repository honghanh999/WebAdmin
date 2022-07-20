const Promotion = require('../models/PromotionModel')
const { renderJson } = require("../../util/app");
const { limit } = require('../config/models')

class PromotionController {
    async create(req, res) {
        try {
            const { admin } = req
            const { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate } = req.body
            const data = { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate, creator: admin._id }
            const promotion = await Promotion.create(data)
            await promotion.populate('creator')
            res.json(renderJson(promotion))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
    async read(req, res) {
        try {
            const { promotion } = req
            res.json(renderJson({ promotion }))
        }
         catch(error) {
             res.json(renderJson({}, false, 400, error.message))
        }
    }

    async update(req, res) {
        try {
            const { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate } = req.body
            const { promotion } = req
            await Promotion.updateOne({
                $set: {
                    title, code, description, percentOff, minPurchaseQuantity, startDate, endDate
                }
            })
            const newPromotion = await Promotion.findById({ _id: promotion._id }).populate('creator')
            res.json(renderJson({ promotion: newPromotion }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async delete(req, res) {
        try {
            const { promotion } = req
            await Promotion.deleteOne({ _id: promotion._id })
            res.json(renderJson({}))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async index(req, res) {
        try {
            const { page, search } = req.query
            const skipPage = page * limit
            const dbQuery = {
                $or: [{
                    title: new RegExp(search)
                }, {
                    code: new RegExp(search)
                }, {
                    description: new RegExp(search)
                }]
            }
            const promotion = await Promotion.find(dbQuery).limit(limit).skip(skipPage).populate('creator')
            res.json(renderJson({ promotion }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = PromotionController