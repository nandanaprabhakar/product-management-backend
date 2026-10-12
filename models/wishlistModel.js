const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
     productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
     },
     productname: {
        type: String,
        require:  true
     },
     price: {
        type: Number,
        require: true
     },
     image: {
        type: String
     }
})

module.exports = mongoose.model('Wishlist', wishlistSchema);