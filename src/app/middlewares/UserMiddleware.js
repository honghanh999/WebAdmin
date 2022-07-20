const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')
const {renderJson} = require("../../util/app");

class UserMiddleware {
    async findId(req, res, next) {
        try {
            const { _id } = req.params
            const user = await User.findById(_id)
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async findIdLockedUser(req, res, next) {
        try {
            const { id } = req.params
            const lockedUser = await LockedUser.findById({ _id: id})
            if (lockedUser) {
                req.lockedUser = lockedUser
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = UserMiddleware