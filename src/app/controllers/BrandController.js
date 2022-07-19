const Brand = require("../models/BrandModel");
const { renderJson } = require("../../util/app");

class BrandController{
    async create(req, res) {
        try {
            const { admin } = req
            const { name } = req.body
            const data = {
                name,
                creator: admin._id
            }
            const brand = (await Brand.create(data)).populate("creator")
            res.json(renderJson(brand))
        } catch(error) {
            res.json(renderJson({}, 400, false, error.message))
        }
    }

    async read(req, res) {
        try {
            const { brand } = req
            const data = await Brand.findById({ _id: brand._id }).populate("creator")
            res.json(renderJson(data))
        } catch(error) {
            res.json(renderJson({}, 400, false, error.message))
        }
    }

    async update(req, res) {
        try {
            const { brand } = req
            const { name } = req.body
            await Brand.updateOne({ _id: brand._id}, {
                $set: {
                    name
                }
            })
            const newBrand = await Brand.findById({ _id: brand._id }).populate("creator")
            res.json(renderJson({ brand: newBrand }))
        } catch(error) {
            res.json(renderJson({}, 400, false, error.message))
        }
    }

    async delete(req, res) {
        try {
            const { brand } = req
            await Brand.deleteOne({ _id: brand._id })
            res.json(renderJson({}))
        } catch(error) {
            res.json(renderJson({}, 400, false, error.message))
        }
    }

    async index(req, res) {
        try {
            const { search } = req.query
            const dbQuery = {
                name: new RegExp(search)
            }
            const brand = await Brand.find(dbQuery).populate('creator')
            const count = await Brand.count(dbQuery)
            res.json(renderJson({ brand, count }))
        } catch(error) {
            res.json(renderJson({}, 400, false, error.message))
        }
    }
}

module.exports = BrandController
