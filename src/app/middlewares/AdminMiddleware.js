const Admin = require('../models/AdminModel')
const Joi = require('joi')
const {handleError, renderJson} = require("../../util/app");
const jwt = require('jsonwebtoken')

class AdminMiddleware {
    validateAdmin(req, res, next) {
        const schema = Joi.object({
            fullName: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().min(5).max(30).required(),
            confirmPassword: Joi.ref('password')
        })
        schema.with('confirmPassword', 'password')
        handleError(req, res, next, schema)
    }
    validateLogin(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(5).max(30).required()
        })
        handleError(req, res, next, schema)
    }
    async authenticateToken(req, res, next) {
        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        try {
            const verified = jwt.verify(token, accessTokenSecret)
            if (!verified) {
                res.json(renderJson({}, false, 401, "Unauthorized"))
            } else {
                req.admin = await Admin.findById(verified.admin._id)
                next()
            }
        } catch(error) {
            res.json(renderJson({}, false, 401, "Unauthorized"))
        }
    }
}

module.exports = AdminMiddleware