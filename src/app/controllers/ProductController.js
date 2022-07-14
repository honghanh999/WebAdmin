const Product = require('../models/ProductModel')
const { renderJson } = require("../../util/app");

const { limit } = require('../config/models/index')

class ProductController {
    async create(req, res) {
        try {
            const { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image } = req.body
            const data = { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image }
            const product = await Product.create(data)
            res.json(renderJson({ product }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async read(req, res) {
        try {
            const { product } = req
            res.json(renderJson({ product }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
    
    async update(req, res) {
        try {
            const { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image } = req.body
            const { product } = req
            await Product.updateOne({ _id: product._id }, {
                $set: { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image }
            })
            const newProduct = await Product.findById({ _id: product._id })
            res.json(renderJson({ product: newProduct }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async delete(req, res) {
        try {
            const { product } = req
            await Product.deleteOne({ _id: product._id })
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
                    name: new RegExp(search)
                }, {
                    type: new RegExp(search)
                }, {
                    frontCamera: new RegExp(search)
                }
                ]
            }

            const product = await Product.find(dbQuery).limit(limit).skip(skipPage)
            const count = await Product.count(dbQuery)
            res.json(renderJson({ product, count }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

}

module.exports = ProductController












