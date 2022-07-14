const User = require('../models/ExampleModel')
const { renderJson } = require('../../util/app')


class ExampleController {
    async store (req, res) {
        // const dataSample = req.body
        // const data = {
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body
        const dataSample = {
            firstName: "firstName",
            lastName: "lastName",
            email: "email",
            password: "password"
        }
        console.log(dataSample)
        const result = await User.create(dataSample)
        res.json(renderJson({ result }))
    }
}

module.exports = ExampleController