const orderService = require("../services/OrderService")
const { renderJson, handler } = require('../../util/app')


class OrderController {
    async order(req, res) {
        const [error, result] = await handler(orderService.order(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async getOrder(req, res) {
        const [error, result] = await handler(orderService.read(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async index(req, res) {
        const [error, result] = await handler(orderService.get(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = OrderController