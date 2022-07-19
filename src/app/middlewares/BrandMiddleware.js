const Brand = require('../models/BrandModel')
const { renderJson } = require('../../util/app')
const { ObjectId } = require('mongoose').Types

class BrandMiddleware {
    async findId(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.findById({ _id: id } )
            if (!brand) {
                res.json(renderJson({}, false, 400, 'Not found'))
            } else {
                req.brand = brand
                next()
            }
        } catch (error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async findBrand(req, res, next) {
        try {
            const { brand }  = req.body
            const valid = ObjectId.isValid(brand)
            if (!valid) {
                return res.json(renderJson({}, false, 400, "Not found"))
            }
            const brandChecked = await Brand.findOne({ _id: brand })
            if (!brandChecked) {
                res.json(renderJson({}, false, 400, "Not found"))
            } else {
                req.brand = brandChecked
                next()
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = BrandMiddleware