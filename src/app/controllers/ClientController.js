const Client = require('../models/ClientModel')
const { renderJson } = require('../../util/app')

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

class ClientController {
    async create(req, res) {
        try {
            const salt = bcrypt.genSaltSync(10)
            const { firstName, lastName, email, password, confirmPassword } = req.body
            const data = {
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, salt)
            }
            const client = await Client.create(data)
            res.json(renderJson({ client }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const client = await Client.findOne({ email })
            if (!client) {
                res.json(renderJson({}, false, 400, 'email or password is invalid'))
            }
            if (!bcrypt.compareSync(password, client.password)) {
                res.json(renderJson({}, false, 400, 'email or password is invalid'))
            } else {
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
                const accessToken = jwt.sign({ client }, accessTokenSecret, { expiresIn: 86400 })
                res.json(renderJson({ client, accessToken }))
            }
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = ClientController