const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    itemId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 5
    },
    review: {
        type: String,
        required: false
    },
    vote: {
        type: Number,
    },
    status: {
        type: String,
        default: 'active'
    }
},{timestamps: true})

const Review = mongoose.model('review',ReviewSchema);
module.exports = Review;