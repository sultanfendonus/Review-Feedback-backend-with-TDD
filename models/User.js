const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName : {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required : true
  },
  password: {
      type: String
  },
  isSocial: {
      type: Boolean,
      required: true
  },
  token: {
      type: String,
  },
  points:{
      type: Number,
      default: 0
  },
  avaterUrl: {
      type: String,
      default : 'https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png'
  },
  fbLink: {
      type: String,
  },
  twLink:{
      type: String
  },
  inLink: {
      type: String
  },
  status: {
      type: String,
      default: 'enable'
  },
  
},{timestamps:true});

const User = mongoose.model('user', UserSchema);

module.exports = User;