const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { limit } = require("../config/models");
const LockedUser = require("../models/LockedUserModel");

const register = async (req) => {
    const salt = bcrypt.genSaltSync(10)
    const { firstName, lastName, email, password } = req.body
    const data = {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt)
    }
    return User.create(data)
}

const login = async (req) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error(JSON.stringify({
            message: 'Email or password is invalid',
            code: 400
        }))
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessToken = jwt.sign({ user }, accessTokenSecret, { expiresIn: 86400 })
    return { user, accessToken }
}

const list = async (req) => {
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
    return { user, count }
}

const lock = async (req) => {
    const { user } = req
    const data = { ...user }
    const lockedUser = await LockedUser.create(data._doc)
    await User.deleteOne({ _id: user._id })
    return lockedUser
}

const unlock = async (req) => {
    const { lockedUser } = req
    const data = { ...lockedUser }
    const unlockedUser = await User.create(data._doc)
    await LockedUser.deleteOne({ _id: lockedUser._id })
    return unlockedUser
}
module.exports = {
    register,
    login,
    list,
    lock,
    unlock
}