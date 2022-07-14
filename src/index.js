require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3333
const route = require('./routes')
const db = require('./app/config/db')
const fileUpload = require('express-fileupload')


db.connect()
app.use(fileUpload())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
route(app)

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`)
})