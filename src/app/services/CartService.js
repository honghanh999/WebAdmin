const Cart = require("../models/CartModel");
const { cartStatus, populateCartDefault } = require("../config/models");

const add = async (req) => {
    const { product, user } = req
    const { quantity } = req.body
    const checkProduct = await Cart.findOne({ product: product._id, status: cartStatus.addNew })
    if (checkProduct) {
        const totalQuantity = checkProduct.quantity + parseInt(quantity, 10)
        const price = product.price * totalQuantity
        await Cart.updateOne({ product: product._id, status: cartStatus.addNew }, {
            $set: {
                quantity: totalQuantity,
                price
            }
        })
        return Cart.findOne({ product: product._id, status: cartStatus.addNew }).populate(populateCartDefault)
    }
    const price = product.price * quantity
    const data = {
        product: product._id,
        quantity,
        price,
        user: user._id,
        status: cartStatus.addNew
    }
    const cart = await Cart.create(data)
    await cart.populate(populateCartDefault)
    return cart
}

const deleteProduct = async (req) => {
    const { product } = req
    const checkProduct = await Cart.findOne({ product: product._id, status: cartStatus.addNew })
    if (!checkProduct) {
        throw new Error(JSON.stringify({
            message: "not found",
            code: 404
        }))
    }
    return Cart.deleteOne({ product: product._id, status: cartStatus.addNew })
}

const update = async (req) => {
    const { quantity } = req.body
    const { product } = req
    const checkProduct = await Cart.findOne({ product: product._id, status: cartStatus.addNew })
    if (!checkProduct) {
        throw new Error(JSON.stringify({
            message: "not found",
            code: 404
        }))
    }
    if (!quantity) {
        return Cart.deleteOne({ product: product._id, status: cartStatus.addNew })
    }
    await Cart.updateOne({ product: product._id, status: cartStatus.addNew }, {
        $set: {
            quantity,
            price: product.price * quantity
        }
    })
    return Cart.find({ product: product._id, status: cartStatus.addNew }).populate(populateCartDefault)
}

module.exports = {
    add,
    deleteProduct,
    update,
}