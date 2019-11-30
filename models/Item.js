const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    total_rate_point: {
        type: Number,
        default: 0
    },
    num_of_rate: {
        type: Number,
        default: 0
    },
    tenStars: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
},{timestamps:true})

const Item = mongoose.model('item',ItemSchema);
module.exports = Item;