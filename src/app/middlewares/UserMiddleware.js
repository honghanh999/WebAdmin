const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')
const {renderJson} = require("../../util/app");

class UserMiddleware {
    async findId(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById({ _id: id})
            console.log({ user })
            if (user) {
                req.user = user
                next()
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async findIdLockedUser(req, res, next) {
        try {
            const { id } = req.params
            const lockedUser = await LockedUser.findById({ _id: id})
            console.log({ lockedUser })
            if (lockedUser) {
                req.lockedUser = lockedUser
                next()
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = UserMiddleware