const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const store = async (req) => {
    const salt = bcrypt.genSaltSync(10)
    const { fullName, address, phoneNumber, username, password, confirmPassword } = req.body
    const data = {
        fullName,
        address,
        phoneNumber,
        username,
        password: bcrypt.hashSync(password, salt),
        salt
    }
    return Admin.create(data)
}

const login = async (req) => {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username: username })
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        throw new Error("Username or password is invalid")
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessToken = jwt.sign({ admin }, accessTokenSecret, { expiresIn: 86400 })
    return { admin, accessToken }
}
const getMe = async (req) => {
    const { admin } = req
    return admin
}

module.exports = {
    store,
    login,
    getMe,
}