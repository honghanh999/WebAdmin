const Promotion = require("../models/PromotionModel");
const { limit } = require("../config/models");

const store = async (req) => {
    const { admin } = req
    const { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate } = req.body
    const data = { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate, creator: admin._id }
    const promotion = await Promotion.create(data)
    return promotion.populate('creator')
}

const read = async (req) => {
    const { promotion } = req
    return promotion
}

const update = async (req) => {
    const { title, code, description, percentOff, minPurchaseQuantity, startDate, endDate } = req.body
    const { promotion } = req
    await Promotion.updateOne({ _id: promotion._id }, {
        $set: {
            title, code, description, percentOff, minPurchaseQuantity, startDate, endDate
        }
    })
    return Promotion.findById({ _id: promotion._id }).populate('creator')
}

const deletePromotion = async (req) => {
    const { promotion } = req
    return Promotion.deleteOne({ _id: promotion._id })
}

const get = async (req) => {
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
    return Promotion.find(dbQuery).limit(limit).skip(skipPage).populate('creator')
}

module.exports = {
    store,
    read,
    update,
    deletePromotion,
    get
}