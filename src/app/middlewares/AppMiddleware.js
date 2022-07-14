const { renderJson } = require ('../../util/app')

class AppMiddleware {
    async parseIntPage (req, res, next) {
        let { page } = req.query
        page = parseInt(page, 10)
        page = isNaN(page) ? 0 : page
        req.query.page = page
        next()
    }

    async checkSort(req, res, next) {
        let { sort } = req.query
        if (!sort) {
            next()
        } else {
            sort = parseInt(sort, 10)
            if (sort !== 1 && sort !== -1) {
                res.status(400).json(renderJson({}, false, 400, 'Sort value in valid'))
            } else {
                next()
            }
        }
    }
}

module.exports = AppMiddleware