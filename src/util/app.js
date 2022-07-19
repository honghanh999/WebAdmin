const Image = require("../app/models/ImageModel");
const formidable = require("formidable");
const fs = require("fs");
const renderJson = (data = {}, status = true, code = 200, message = 'success') => {
    return {
        status,
        code,
        message,
        data
    }
}

function handleError(req, res, next, schema) {
    const options = {
        abortEarly: false, // when true, stops validation on the first error, otherwise returns all the errors found
        allowUnknown: true, // when true, allows object to contain unknown keys which are ignored.
        stripUnknown: true // remove unknown elements from objects and arrays
    }
    const { error, value } = schema.validate(req.body, options)
    if (error) {
        const { message } = error
        const details = error.details
        const result = []
        for (const element of details) {
            const context = {}
            context[element.context.key] = element.message
            result.push(context)
        }
        res.json(renderJson({ details: result }, false, 400, message))
    } else {
        req.body = value
        next()
    }
}

function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i <length; i ++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

// function handleFile (req) {
//     const form = formidable({
//         multiples: false,
//         uploadDir: '../../uploadFolder',
//         keepExtensions: true,
//     })
//     form.parse(req, function parseFile (err, fields, files) {
//         if (err) {
//             throw Error(err.message)
//         }
//         return files.file.filepath
//     })
// }

function storeFile (req, image) {
    if(image) {
        const generateFile = generateString(10)
        const fileName = generateFile + image.name
        const extension = fileName.split('.').pop()
        if (extension !== "jpeg"){
            throw Error("Image is invalid")
        }
        const fileSize = image.size
        const filePath = "src/app/uploadImage/" + fileName
        fs.writeFileSync(filePath, image.data)

        return { fileName, fileSize, filePath }
    }
}

module.exports = {
    renderJson,
    handleError,
    generateString,
    storeFile
}