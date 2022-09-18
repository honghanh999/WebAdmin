const adminService = require("../services/AdminService")
const { renderJson } = require('../../util/app')
const { handler } = require('../../util/app')


class AdminController {
    async create(req, res) {
        const [error, result]  = await handler(adminService.store(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async login(req, res) {
        const [error, result]  = await handler(adminService.login(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async me(req, res) {
        const [error, result]  = await handler(adminService.getMe(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = AdminController