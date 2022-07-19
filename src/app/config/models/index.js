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
module.exports = {
    limit,
    defaultPage,
    populateProductDefault,
}