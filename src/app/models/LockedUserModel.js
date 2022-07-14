const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LockedUserSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LockedUser', LockedUserSchema)