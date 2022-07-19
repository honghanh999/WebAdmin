const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')
const { renderJson } = require("../../util/app");
const { limit } = require('../config/models/index')

class UserController {
    async create(req, res) {
        try {
            const { email, lastName, firstName, address, city, phoneNumber } = req.body
            const data = { email, lastName, firstName, address, city, phoneNumber }
            const user = await User.create(data)
            res.json(renderJson({ user }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async list(req, res) {
        try {
            const { page, search } = req.query
            const skipPage = page * limit

            const dbQuery = {
                $or: [{
                    email: new RegExp(search)
                }, {
                    lastName: new RegExp(search)
                }, {
                    firstName: new RegExp(search)
                }, {
                    address: new RegExp(search)
                }, {
                    city: new RegExp(search)
                }, {
                    phoneNumber: new RegExp(search)
                }]
            }

            const user = await User.find(dbQuery).limit(limit).skip(skipPage)
            const count = await User.count(dbQuery)
            res.json(renderJson({ user, count }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async lock(req, res) {
        try {
            const { user } = req
            const data = { ...user }
            const lockedUser = await LockedUser.create(data._doc)
            await User.deleteOne({ _id: user._id })
            res.json(renderJson({ lockedUser }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async unlock(req, res) {
        try {
            const { lockedUser } = req
            const data = { ...lockedUser }
            const unlockedUser = await User.create(data._doc)
            await LockedUser.deleteOne({ _id: lockedUser._id })
            res.json(renderJson({ unlockedUser }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = UserController