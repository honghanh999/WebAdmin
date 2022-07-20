const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')
const {renderJson} = require("../../util/app");

class UserMiddleware {
    async findId(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async findIdLockedUser(req, res, next) {
        try {
            const { id } = req.params
            const lockedUser = await LockedUser.findById(id)
            if (lockedUser) {
                req.lockedUser = lockedUser
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }
}

module.exports = UserMiddleware