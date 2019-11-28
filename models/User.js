const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const global = require('../global/index') 
const saltRounds = 10;
const Schema = mongoose.Schema;

const jwsTokenSchema = new Schema({
    token: {
        type: String,
        require: true
    }
})

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
      default: ''
  },
  twLink:{
      type: String,
      default: ''
  },
  inLink: {
      type: String,
      default: ''
  },
  status: {
      type: String,
      default: 'enable'
  },
  jwsToken: [jwsTokenSchema]
  
  
},{timestamps:true});

UserSchema.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        user.password = hash
        next();
      });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.createJWSToken = async function(){
    let user = this;
    const token = jwt.sign({ id: user._id.toString() }, global.randomKey);
    user.jwsToken = user.jwsToken.concat({token})
    await user.save()
    return token;
}

const User = mongoose.model('user', UserSchema);

module.exports = User;