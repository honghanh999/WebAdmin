const Admin = require('../models/AdminModel')
const { renderJson, handleError } = require('../../util/app')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class AdminController {
    async create(req, res) {
        try {
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
            const admin = await Admin.create(data)
            res.json(renderJson({ admin }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const admin = await Admin.findOne({ username: username })
            if (!admin) {
                return res.json(renderJson({}, false, 400, "Username or password is invalid"))
            }
            if (!bcrypt.compareSync(password, admin.password)) {
                res.json(renderJson({}, false, 400, "Username or password is invalid"))
            } else {
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
                const accessToken = jwt.sign({ admin }, accessTokenSecret, { expiresIn: 86400 })
                res.json(renderJson({ admin, accessToken }))
            }
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async me(req, res) {
        try {
            const { admin } = req
            res.json(renderJson({ admin }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = AdminController