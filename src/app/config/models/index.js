const limit = 5
const defaultPage = 0
const populateProductDefault = [{
    path: "image",
    populate: {
        path: "creator"
    }
}, {
    path: "brand",
    populate: {
        path: "creator"
    }
},
    "creator"]
const populateCartDefault = [{
    path: "product",
    populate: [{
        path: "image"
    }, "brand"]
}, {
    path: "user"
}]
const populateOrderDefault = ['user',
    {
        path: "carts",
        populate: {
            path: "product"
        }
    }
]
const cartStatus = {
    all: ["addNew", "completed"],
    completed: "completed",
    addNew: "addNew"
}
const paymentMethod = {
    all: ["cash", "ATM", "VISA"],
    cash: "cash",
    ATM: "ATM",
    VISA: "VISA"
}
module.exports = {
    limit,
    defaultPage,
    populateProductDefault,
    populateCartDefault,
    cartStatus,
    paymentMethod,
    populateOrderDefault
}