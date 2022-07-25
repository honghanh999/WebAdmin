const mongoose = require('mongoose')

async function connect() {
    try {
        const dbPath = process.env.DB_PATH
        console.log({ dbPath })
        await mongoose.connect(dbPath, {
            useUnifiedTopology: true,
            autoIndex: true,
        })
        mongoose.set('debug', true)
        console.log('Connect successfully')
    } catch (error) {
        console.log(error)
        console.log('Connect failure!')
    }
}

module.exports = { connect }
