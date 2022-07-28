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
const cartStatus = {
    all: ["addNew", "completed"],
    completed: "completed",
    addNew: "addNew"
}
const method = {
    all: ["cash", "bankCard"],
    cash: "cash",
    bankCard: "bankCard"
}
module.exports = {
    limit,
    defaultPage,
    populateProductDefault,
    populateCartDefault,
    cartStatus,
    method
}