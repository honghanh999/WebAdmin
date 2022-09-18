const { storeFile } = require("../../util/app");
const Image = require("../models/ImageModel");
const Product = require("../models/ProductModel");
const { populateProductDefault, limit} = require("../config/models");

const store = async (req) => {
    const { brand, admin } = req
    const { image } = req.files
    const { fileName, fileSize, filePath } = storeFile(req, image)
    const dataImage = {
        fileName,
        filePath,
        fileSize,
        creator: admin._id
    }
    const imageStored = await Image.create(dataImage)
    const { name, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim } = req.body
    const data = { name, brand: brand._id, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, creator: admin._id, image: imageStored._id }
    const product = await Product.create(data)
    return product.populate(populateProductDefault)
}

const read = async (req) => {
    const { product } = req
    return product.populate(populateProductDefault)
}

const update = async (req) => {
    const { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image } = req.body
    const { product } = req
    await Product.updateOne({ _id: product._id }, {
        $set: { name, type, code, amount, price, screen, CPU, frontCamera, afterCamera, RAM, ROM, memoryStick, sim, image }
    })
    return Product.findById({ _id: product._id }).populate(populateProductDefault)
}

const deleteProduct = async (req) => {
    const { product } = req
    return Product.deleteOne({ _id: product._id })
}

const get = async (req) => {
    const { page, search } = req.query
    const skipPage = page * limit
    const dbQuery = {
        $or: [{
            name: new RegExp(search)
        }, {
            frontCamera: new RegExp(search)
        }
        ]
    }
    const product = await Product.find(dbQuery).limit(limit).skip(skipPage).populate(populateProductDefault)
    const count = await Product.count(dbQuery)
    return { product, count }
}

module.exports = {
    store,
    read,
    update,
    deleteProduct,
    get
}