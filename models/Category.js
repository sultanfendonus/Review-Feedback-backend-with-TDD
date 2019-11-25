const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: 'https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png',
        required: true
    }
})

const Category = mongoose.model('category',CategorySchema);
module.exports = Category;