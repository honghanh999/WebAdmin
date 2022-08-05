const branchService = require("../services/BranchService")
const { renderJson, handler } = require("../../util/app")

class BrandController{
    async create(req, res) {
        const [ error, result ] = await handler(branchService.store(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async read(req, res) {
        const [ error, result ] = await handler(branchService.read(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async update(req, res) {
        const [ error, result ] = await handler(branchService.update(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async delete(req, res) {
        const [ error, result ] = await handler(branchService.deleteBrand(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }

    async index(req, res) {
        const [ error, result ] = await handler(branchService.get(req))
        if (error) {
            return res.status(error.code).json(renderJson({}, false, error.code, error.message))
        }
        res.json(renderJson(result))
    }
}

module.exports = BrandController
