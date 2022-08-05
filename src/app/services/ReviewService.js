const Review = require("../models/ReviewModel");
const Cart = require("../models/CartModel");
const { cartStatus, limit, filterReview } = require("../config/models");
const ImageUser = require("../models/ImageUserModel");

const create = async (req) => {
    const { score, comment } = req.body
    const { product, user } = req
    const reviewExisted = await Review.findOne({ product: product, user: user._id })
    const cartCompleted = await Cart.findOne({ product: product, status: cartStatus.completed })
    if (reviewExisted || !cartCompleted) {
        throw new Error(JSON.stringify({
            message: "Not allowed",
            code: 405
        }))
    }
    const data = { score, comment, product: product._id, user: user._id }
    if (req.files && req.files.images) {
        const { imagesStored } = req
        data.images = imagesStored
    }
    const review = await Review.create(data)
    return review.populate(['product', 'user', 'images'])
}

const update = async (req) => {
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
    return Review.findById(review).populate(['product', 'user', 'images'])
}

const deleteReview = async (req) => {
    const { review } = req
    return Review.deleteOne({ _id: review._id })
}

const getOwnReview = async (req) => {
    const { user } = req
    const { page } = req.query
    const skipPage = limit * page
    return Review.find({ user: user._id }).limit(limit).skip(skipPage).populate(['product', 'user', 'images'])
}

const getProductReview = async (req) => {
    const { product } = req
    const { page, filterTarget, filterValue } = req.query
    const skipPage = limit * page
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
    return Review.find(query).limit(limit).skip(skipPage).populate(['product', 'user', 'images'])
}

module.exports = {
    create,
    update,
    deleteReview,
    getOwnReview,
    getProductReview
}
