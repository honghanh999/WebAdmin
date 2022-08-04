const Review = require('../models/ReviewModel')
const Joi = require('joi')
const { handleError, renderJson, storeFiles } = require("../../util/app")
const { score, filterReview } = require("../config/models")
const ImageUser = require("../models/ImageUserModel");

class ReviewMiddleware {
    async validateReview(req, res, next) {
        const schema = Joi.object({
            score: Joi.number().valid(...score.all).required(),
            comment: Joi.string().required(),
            product: Joi.required(),
        })
        handleError(req, res, next, schema)
    }

    async findId(req, res, next) {
        try {
            const { id } = req.params
            const review = await Review.findById(id)
            if (!review) {
                return res.status(404).json(renderJson({}, false, 404, 'Not found'))
            } else {
                req.review = review
                next()
            }
        } catch (error) {
            res.status(404).json(renderJson({}, false, 404, 'Not found'))
        }
    }

    async validatePage (req, res, next) {
        const pageSearch = Joi.object({
            page: Joi.number().default(0),
        })
        handleError(req, res, next, pageSearch)
    }

    async validateGetReview (req, res, next) {
        const validate = Joi.object({
            filterTarget: Joi.any().valid(...filterReview.all),
            filterValue: Joi.any()
        })
        handleError(req, res, next, validate)
    }

    async storeImages (req, res, next) {
        if (req.files && req.files.images) {
            const { user } = req
            const { images } = req.files
            const finalImages = !images.length ? [images] : images
            const { filesName, filesSize, filesPath } = storeFiles(req, finalImages)
            const imagesStored = []
            for (let file = 0; file < filesName.length; file ++) {
                const dataImage = {
                    fileName: filesName[file],
                    filePath: filesPath[file],
                    fileSize: filesSize[file],
                    user: user._id
                }
                const imageCreated = await ImageUser.create(dataImage)
                imagesStored.push(imageCreated._id)
            }
            req.imagesStored = imagesStored
        }
        next()
    }
}

module.exports = ReviewMiddleware