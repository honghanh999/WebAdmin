const Review = require('../models/ReviewModel')
const Cart = require('../models/CartModel')
const { renderJson } = require("../../util/app");
const { cartStatus, limit } = require("../config/models");
const Product = require("../models/ProductModel");

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
            const review = await Review.create(data)
            await review.populate(['product', 'user'])
            res.json(renderJson({ review }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message ))
        }
    }

    async read(req, res) {
        try {
            const { review } = req
            await review.populate(['product', 'user'])
            res.json(renderJson(review))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message ))
        }
    }

    async update(req, res) {
        try {
            const { score, comment } = req.body
            const { review } = req
            await Review.updateOne({ _id: review._id }, {
                $set: { score, comment }
            })
            const newReview = await Review.findById({ _id: review._id }).populate(['product', 'user'])
            res.json(renderJson({ product: newReview }))
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

    async index(req, res) {
        try {
            const { page, search } = req.query
            const skipPage = limit * page
            const dbQuery = {
                comment: new RegExp(search)
            }
            const reviews = await Review.find(dbQuery).limit(limit).skip(skipPage).populate(['product', 'user'])
            const count = await Review.count(dbQuery)
            res.json(renderJson({ reviews, count }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = ReviewController