const Brand = require("../models/BrandModel");

const store = async (req) => {
    const { admin } = req
    const { name } = req.body
    const data = {
        name,
        creator: admin._id
    }
    const brand = await Brand.create(data)
    return brand.populate("creator")
}

const read = async (req) => {
    const { brand } = req
    return brand.populate("creator")
}

const update = async (req) => {
    const { brand } = req
    const { name } = req.body
    await Brand.updateOne({ _id: brand._id}, {
        $set: {
            name
        }
    })
    return Brand.findById({ _id: brand._id }).populate("creator")
}

const deleteBrand = async (req) => {
    const { brand } = req
    return Brand.deleteOne({ _id: brand._id })
}

const get = async (req) => {
    const { search } = req.query
    const dbQuery = {
        name: new RegExp(search)
    }
    const brands = await Brand.find(dbQuery).populate('creator')
    const count = await Brand.count(dbQuery)
    return { brands, count }
}

module.exports = {
    store,
    read,
    update,
    deleteBrand,
    get,
}