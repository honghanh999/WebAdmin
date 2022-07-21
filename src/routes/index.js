const exampleRoute = require('./example')
const userRoute = require('./user')
const productRoute = require('./product')
const adminRoute = require('./admin')
const promotionRoute = require('./promotion')
const brandRoute = require('./brand')
const clientRoute = require('./client')
const cartRoute = require('./cart')

const AppMiddleware = require('../app/middlewares/AppMiddleware')
const appMiddleware = new AppMiddleware


function route(app) {
    app.use('*', appMiddleware.parseIntPage, appMiddleware.checkSort)
    app.use('/example', exampleRoute)
    app.use('/user', userRoute)
    app.use('/product', productRoute)
    app.use('/admin', adminRoute)
    app.use('/promotion', promotionRoute)
    app.use('/brand', brandRoute)
    app.use('/client', clientRoute)
    app.use('/cart', cartRoute)
}

module.exports = route

