const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')

const { renderJson } = require("../../util/app");
const { limit } = require('../config/models/index')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
    async register(req, res) {
        try {
            const salt = bcrypt.genSaltSync(10)
            const { firstName, lastName, email, password } = req.body
            const data = {
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, salt)
            }
            const user = await User.create(data)
            res.json(renderJson({ user }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                res.json(renderJson({}, false, 400, 'email or password is invalid'))
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.json(renderJson({}, false, 400, 'email or password is invalid'))
            } else {
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
                const accessToken = jwt.sign({ user }, accessTokenSecret, { expiresIn: 86400 })
                res.json(renderJson({ user, accessToken }))
            }
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
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