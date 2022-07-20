const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PromotionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    percentOff: {
        type: Number,
        required: true
    },
    minPurchaseQuantity: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    creator: {
        type: Object.Types.ObjectId,
        ref: "admin",
        required: true
    }
})

module.exports = mongoose.model("Promotion", PromotionSchema)