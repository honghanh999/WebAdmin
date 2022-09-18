const userService = require('../services/UserService')
const { renderJson, handler} = require("../../util/app");

class UserController {
    async register(req, res) {
        const [error, result] = await (handler(userService.register(req)))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async login(req, res) {
        const [error, result] = await (handler(userService.login(req)))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async list(req, res) {
        const [error, result] = await (handler(userService.list(req)))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async lock(req, res) {
        const [error, result] = await (handler(userService.lock(req)))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async unlock(req, res) {
        const [error, result] = await (handler(userService.unlock(req)))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = UserController