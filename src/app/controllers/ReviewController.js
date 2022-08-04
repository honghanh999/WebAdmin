const Review = require('../models/ReviewModel')
const ImageUser = require('../models/ImageUserModel')
const Cart = require('../models/CartModel')
const { renderJson, storeFiles, storeFile } = require("../../util/app");
const { cartStatus, limit, filterReview } = require("../config/models");
const Image = require("../models/ImageModel");

class ReviewController {
    async create(req, res) {
        try {
            const { score, comment } = req.body
            const { product, user } = req
            const reviewExisted = await Review.findOne({ product: product, user: user._id })
            const cartCompleted = await Cart.findOne({ product: product, status: cartStatus.completed })
            if (reviewExisted || !cartCompleted) {
                return res.status(405).json(renderJson({}, false, 405, "Not allowed"))
            }
            const data = { score, comment, product: product._id, user: user._id }
            if (req.files && req.files.images) {
                const { imagesStored } = req
                data.images = imagesStored
            }
            const review = await Review.create(data)
            await review.populate(['product', 'user', 'images'])
            res.json(renderJson({ review }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message ))
        }
    }

    async update(req, res) {
        try {
            const { score, comment } = req.body
            const { review } = req
            const data = { score, comment }
            await ImageUser.deleteMany({ _id: { $in: review.images } })
            if (req.files && req.files.images) {
                const { imagesStored } = req
                data.images = imagesStored
            }
            await Review.updateOne({ _id: review._id }, {
                $set: { ...data }
            })
            const newReview = await Review.findById(review).populate(['product', 'user', 'images'])
            res.json(renderJson({ review: newReview }))
        } catch(error) {
            res.json(renderJson({}, false, 400, error.message))
        }
    }

    async delete(req, res) {
        try {
            const { review } = req
            await Review.deleteOne({ _id: review._id })
            res.json(renderJson({}))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async getOwnReview(req, res) {
        try {
            const { page } = req.query
            const skipPage = limit * page
            const reviews = await Review.find().limit(limit).skip(skipPage).populate(['product', 'user', 'images'])
            res.json(renderJson({ reviews }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }

    async readProductReview(req, res) {
        try {
            const { product } = req
            const review = await Review.findOne({ product: product._id })
            if (!review) {
                res.json(renderJson({}))
            } else {
                const { filterTarget, filterValue } = req.query
                const query = {
                    product: product._id
                }
                switch (filterTarget) {
                    case filterReview.score:
                        query.score = parseInt(filterValue, 10)
                        break;
                    case filterReview.hasImage:
                        query.image = {
                            $ne: null
                        }
                        break;
                    default:
                        break;
                }
                const reviewProduct = await Review.find(query).populate(['product', 'user', 'image'])
                res.json(renderJson(reviewProduct))
            }
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message ))
        }
    }
}

module.exports = ReviewController