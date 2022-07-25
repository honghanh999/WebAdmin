const User = require('../models/UserModel')
const LockedUser = require('../models/LockedUserModel')

const { renderJson, handleError } = require("../../util/app");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

class UserMiddleware {
    validateRegister(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(30).required(),
            confirmPassword: Joi.any().valid(Joi.ref('password')).required()
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
        const token = authorization.replace("Bearer ", "")
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        try {
            const verified = jwt.verify(token, accessTokenSecret)
            if (!verified) {
                res.status(401).json(renderJson({}, false, 401, "Unauthorized"))
            } else {
                req.user = await User.findById(verified.user._id)
                next()
            }
        } catch(error) {
            res.status(401).json(renderJson({}, false, 401, "Unauthorized"))
        }
    }

    async findId(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async findIdLockedUser(req, res, next) {
        try {
            const { id } = req.params
            const lockedUser = await LockedUser.findById(id)
            if (lockedUser) {
                req.lockedUser = lockedUser
                next()
            } else {
                res.status(404).json(renderJson({}, false, 404, "not found"))
            }
        } catch(error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }
}

module.exports = UserMiddleware