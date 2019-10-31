const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  create(req, res, next) {
    const userProp = req.body;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        
      userProp.password = hash
      User.create(userProp)
        .then(user => res.send(user))
        .catch(next)
        
    });
    
  }

};
