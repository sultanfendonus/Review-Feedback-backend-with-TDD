const User = require('../models/User');

module.exports = {
  create(req, res, next) {
    const userProp = req.body;
    User.create(userProp)
        .then(user => res.send(user))
        .catch(next)
  }

};
