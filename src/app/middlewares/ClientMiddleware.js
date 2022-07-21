const Client = require('../models/ClientModel')
const Joi = require('joi')
const { handleError, renderJson } = require("../../util/app");
const jwt = require('jsonwebtoken')

class ClientMiddleware {
    validateClient(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(30).required(),
            confirmPassword: Joi.ref('password')
        })
        schema.with('confirmPassword', 'password')
        handleError(req, res, next, schema)
    }
    validateLogin(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(30).required()
        })
        handleError(req, res, next, schema)
    }

    async authenticateToken(req, res, next) {
        const { authorization } = req.headers
        console.log({ authorization })
        const token = authorization.replace("Bearer ", "")
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        try {
            const verified = jwt.verify(token, accessTokenSecret)
            if (!verified) {
                res.status(401).json(renderJson({}, false, 401, "Unauthorized"))
            } else {
                req.client = await Client.findById(verified.client._id)
                next()
            }
        } catch(error) {
            res.status(401).json(renderJson({}, false, 401, "Unauthorized"))
        }
    }
}

module.exports = ClientMiddleware