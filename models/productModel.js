const mongoose = require('mongoose');

const productSchemma = mongoose.Schema({
    productname: {
        type: String,
        required: true,
        unique: true
    },
    UploadedImages: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    variants: [{
       ram: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
    }],
})

module.exports = mongoose.model('Product', productSchemma);