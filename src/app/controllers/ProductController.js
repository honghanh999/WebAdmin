const productService = require('../services/ProductService')
const { renderJson, handler } = require("../../util/app")

class ProductController {
    async create(req, res) {
        const [error, result] = await handler(productService.store(req))
        if (error) {
            return res.status(error.code).renderJson({}, false, error.code, error.message)
        }
        res.json(renderJson(result))
    }

    async read(req, res) {
        const [error, result] = await handler(productService.read(req))
        if (error) {
            return res.status(error.code).renderJson({}, false, error.code, error.message)
        }
        res.json(renderJson(result))
    }
    
    async update(req, res) {
        const [error, result] = await handler(productService.update(req))
        if (error) {
            return res.status(error.code).renderJson({}, false, error.code, error.message)
        }
        res.json(renderJson(result))
    }

    async delete(req, res) {
        const [error, result] = await handler(productService.deleteProduct(req))
        if (error) {
            return res.status(error.code).renderJson({}, false, error.code, error.message)
        }
        res.json(renderJson(result))
    }

    async index(req, res) {
        const [error, result] = await handler(productService.get(req))
        if (error) {
            return res.status(error.code).renderJson({}, false, error.code, error.message)
        }
        res.json(renderJson(result))
    }
}

module.exports = ProductController