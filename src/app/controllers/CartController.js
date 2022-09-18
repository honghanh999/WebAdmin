const cartService = require("../services/CartService")
const { renderJson, handler } = require('../../util/app')

class CartController {
    async addToCart(req, res) {
        const [error, result] = await handler(cartService.add(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
    async deleteProductInCart(req, res) {
        const [error, result]  = await handler(cartService.deleteProduct(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
    async updateQuantity(req, res) {
        const [error, result] = await handler(cartService.update(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = CartController