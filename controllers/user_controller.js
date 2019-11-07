const User = require('../models/User');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

module.exports = {
  create(req, res, next) {
    const userProp = req.body;

    User.create(userProp)
    .then(user => res.send(user))
    .catch(next)
  },

  login(req,res,next) {
    const email = req.body.email;
    const password = req.body.password;
    const successLoginResponse = {status: 'success',message:'Login Successful'}
    const failLoginResponse = {status: 'fail',message:'Email or Password Invalid'}

    User.findOne({email})
      .then((user)=>{
        if(user){
          bcrypt.compare(password.toString(), user.password, function(err, result) {
            if(result===true){
              User.findOneAndUpdate({email: user.email},{token: uuidv4()})
                .then(()=>{
                  res.send(successLoginResponse)
                })
             
            }else{
              res.send(failLoginResponse)
            }
            
          });
        }else{
          res.send(failLoginResponse);
        }
        
      })
      .catch(next)
  },

  autoLogin(req,res,next){
    const userInput = req.body;
    const successLoginResponse = {status: 'success',message:'Login Successful'}
    const failLoginResponse = {status: 'fail',message:'Token Invalid'}

    User.findOne({email: userInput.email})
      .then((user)=>{
        if(user.token === userInput.token){
          res.send(successLoginResponse);
        }else{
          res.send(failLoginResponse);
        }
      })
      .catch(next)
  }

};
