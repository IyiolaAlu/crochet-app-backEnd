const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: {type: String, require: true},
    name: {type: String, require: true},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    description: {type: String, require: true},
})

module.exports = mongoose.model('Product', productSchema)