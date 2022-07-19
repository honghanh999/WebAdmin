const Product = require('../models/ProductModel')
const { renderJson } = require('../../util/app')

class ProductMiddleware {
    async findId (req, res, next) {
            try {
                const { id } = req.params
                const product = await Product.findById({ _id: id } )
                if (!product) {
                    res.json(renderJson({}, false, 400, 'Not found'))
                } else {
                    req.product = product
                    next()
                }
            } catch (error) {
                res.json(renderJson({}, false, 400, error.message))
            }
    }
}

module.exports = ProductMiddleware