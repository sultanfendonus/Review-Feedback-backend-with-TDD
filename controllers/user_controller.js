const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async create(req, res, next) {

    try {
      const userProp = req.body;
      const user = new User(userProp)

      const response = await user.save()
      const token = await user.createJWSToken()
      
      res.send(response)

    } catch (err){
      next(err)
    }
  },

  async login(req,res,next) {

    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const user = await User.findOne({email})
      user.comparePassword(password.toString(), async function(err,isMatch){
        if(err) throw err
        if(isMatch){
          await user.createJWSToken()
          res.send(user)
        }else{
          res.status(404).send({message: 'Invalid Email or Password!'})
        }
      })
      
    } catch (err) {
      if (err.message.includes('comparePassword')) {res.status(404).send({message: 'No User Found!'})}
      else{
        next(err)
      }
      
    }

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
  },

  async updateProfile(req,res,next){
    try{
      const inputValue = req.body;
      const email = inputValue.email
      delete inputValue.email

      const afterUpdatedUser = await User.findOneAndUpdate({email}, inputValue, {new: true});
      res.send(afterUpdatedUser);

    }catch(err){
      next(err)
    }
    
  }

};
