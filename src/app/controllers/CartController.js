const Cart = require('../models/CartModel')
const Client = require('../models/ClientModel')
const Product = require('../models/ProductModel')
const { renderJson } = require('../../util/app')
const { populateCartDefault, cartStatus } = require('../config/models')

class CartController {
    async addToCart(req, res) {
        try {
            const { product, client } = req
            const { quantity } = req.body
            const checkProduct = await Cart.findOne({ product: product._id })
            if (checkProduct) {
                const totalQuantity = checkProduct.quantity + parseInt(quantity, 10)
                const price = product.price * totalQuantity
                await Cart.updateOne({ product: product._id }, {
                    $set: {
                        quantity: totalQuantity,
                        price
                    }
                })
                const productUpdated = await Cart.findOne({ product: product._id }).populate(populateCartDefault)
                return res.json(renderJson({ cart: productUpdated }))
            }
            const price = product.price * quantity
            const data = {
                product: product._id,
                quantity,
                price,
                user: client._id,
                status: cartStatus.addNew
            }
            const cart = await Cart.create(data)
            await cart.populate(populateCartDefault)
            res.json(renderJson({ cart }))
        }
         catch(error) {
             res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
    async deleteProductInCart(req, res) {
        try {
            const { product } = req
            const checkProduct = await Cart.findOne({ product: product._id, status: cartStatus.addNew })
            if (!checkProduct) {
                return res.status(404).json(renderJson({}, false, 404, "not found"))
            }
            await Cart.deleteOne({ product: product._id, status: cartStatus.addNew })
            res.json(renderJson({}))
        } catch(error){
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
    async updateQuantity(req, res) {
        try {
            const { quantity } = req.body
            const { product } = req
            const checkProduct = await Cart.findOne({ product: product._id, status: cartStatus.addNew})
            if (!checkProduct) {
                return res.status(404).json(renderJson({}, false, 404, "not found"))
            }
            if (quantity === "0") {
                await Cart.deleteOne({ product: product._id, status: cartStatus.addNew })
                return res.json(renderJson({}))
            }
            await Cart.updateOne({ product: product._id }, {
                $set: {
                    quantity,
                    price: product.price * quantity
                }
            })
            const productUpdated = await Cart.find({ product: product._id }).populate(populateCartDefault)
            res.json(renderJson({ cart: productUpdated }))
        } catch(error) {
            res.status(400).json(renderJson({}, false, 400, error.message))
        }
    }
}

module.exports = CartController